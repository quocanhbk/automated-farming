const feedList = require("./feedList")
const { dbConn } = require("./connection")
const axios = require("axios")
const moment = require("moment")
const { query: queryHelper } = require("./helper")
const { getSystemMode, toggleSystemMode, setHumidity } = require("./systemMode")
const { getHumidityLimit, getWateringMode } = require("./utils")
const publisher = require("./publisher")
require("dotenv").config()

const handleIotButton = () => {
    let query = `SELECT sstatus FROM mainsystem WHERE id = 101`
    dbConn.query(query, function (err, result) {
        if (err) throw err

        let newStatus = result[0]["sstatus"] === 0 ? 1 : 0
        let query = `UPDATE mainsystem SET sstatus = ${newStatus} WHERE id = 101`

        dbConn.query(query, (err, _) => {
            if (err) res.json({ error: err })
            publisher("relay", newStatus)
            publisher("led", newStatus === 1 ? "2" : "1")
        })
    })
}
const checkHumidScheduler = async () => {
    // check current power, if "off", return
    let powerRes = await queryHelper(
        dbConn,
        "SELECT sstatus FROM mainsystem WHERE id = 101"
    ).catch((err) => console.log(err))
    let power = powerRes ? powerRes[0]["sstatus"] : 0
    if (power === 0) return

    // start checking current humidity...
    console.log(
        `[SYSTEM]     SCHEDULE: Checking humidity at ${moment().format(
            "YYYY-MM-DD HH:mm:ss"
        )}...`
    )
    const humidValue = parseInt(
        JSON.parse(
            (
                await axios.get(
                    "https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-soil/data/last",
                    {
                        headers: {
                            "X-AIO-Key": process.env.ADAFRUIT_PASSWORD1,
                        },
                    }
                )
            ).data.value
        ).data
    )
    console.log(`[SYSTEM]     Current humidity: ${humidValue}`)
    // after checking, insert message into message database
    let now = moment().format("YYYY-MM-DD HH:mm:ss")
    let query = `INSERT INTO message (system_id, mtime, humidity_value) VALUES ("101", "${now}", ${humidValue})`
    dbConn.query(query, (err, result) => {
        if (err) console.log(err.sqlMessage)
    })
    // write into LCD
    publisher("lcd", `Humidity: ${humidValue}`)

    // check current Mode. If auto, start automatic watering!
    let modeRes = await queryHelper(
        dbConn,
        "SELECT smode FROM mainsystem WHERE id = 101"
    ).catch((err) => console.log(err))
    let mode = modeRes[0]["smode"]
    if (mode === 1) {
        // get bottom limit of humidity
        let { lower_bound } = (
            await queryHelper(
                dbConn,
                "SELECT lower_bound FROM farm.sensor WHERE system_id = '101'"
            )
        )[0]
        // if current humidity < bottom limit => start automatic watering
        if (humidValue < lower_bound) {
            autoWatering(humidValue)
        }
    }
}

//ki????m tra ?????? ????m
const autoWatering = (humidValue) => {
    console.log("[SYSTEM]     Checking system watering mode")
    let systemMode = getSystemMode()
    if (systemMode === "WATERING") {
        console.log("[SYSTEM]     The system is watering. Watering aborted")
    } else {
        console.log("[SYSTEM]     Starting watering")
        setHumidity(humidValue)
        toggleSystemMode()
    }
}

// this function will run every 40 seconds
const handleSensorInput = async (currentHumidity) => {
    let { top } = await getHumidityLimit()
    let wateringMode = await getWateringMode()
    if (
        getSystemMode() === "WATERING" &&
        currentHumidity > top &&
        wateringMode === 1
    ) {
        // stop drv
        toggleSystemMode()
    }
}

const startManualWatering = async () => {
    // if watering mode is auto, switch to manual
    // let query = `SELECT smode FROM mainsystem WHERE id = 101`;
    // let {smode} = (await queryHelper(dbConn, query))[0]
    let query = "UPDATE mainsystem SET smode = 0 WHERE id = 101"
    queryHelper(dbConn, query)
    const humidValue = parseInt(
        JSON.parse(
            (
                await axios.get(
                    "https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-soil/data/last",
                    {
                        headers: {
                            "X-AIO-Key": process.env.ADAFRUIT_PASSWORD1,
                        },
                    }
                )
            ).data.value
        ).data
    )
    setHumidity(humidValue)
    toggleSystemMode("START")
}

const stopManualWatering = async () => {
    toggleSystemMode("STOP")
}
module.exports = {
    handleIotButton,
    autoWatering,
    checkHumidScheduler,
    handleSensorInput,
    startManualWatering,
    stopManualWatering,
}
