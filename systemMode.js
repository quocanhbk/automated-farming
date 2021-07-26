const { dbConn } = require("./connection")
const { query: queryHelper } = require("./helper")
const { addHistory } = require("./utils")
const publisher = require("./publisher")
let mode = "IDLE"
let startingTime = new Date()
let currentHumidity = 0
exports.getSystemMode = () => {
    return mode
}
exports.setHumidity = (humidity) => {
    currentHumidity = humidity
}
exports.toggleSystemMode = async (message) => {
    // toggle from "IDLE" to "WATERING"
    if (mode === "IDLE" && message === "START") {
        mode = "WATERING"
        // run drv
        let power = (
            await queryHelper(
                dbConn,
                "SELECT power FROM motor WHERE system_id = 101"
            )
        )[0]
        console.log("[SYSTEM]     Starting to water")
        startingTime = new Date()
        publisher("drv", Math.round(power * 2.55).toString())
    }
    // toggle from "WATERING" to "IDLE"
    else if (mode === "WATERING" && message === "STOP") {
        mode = "IDLE"
        let timeDiff = Math.round(
            (new Date().getTime() - startingTime.getTime()) / 1000
        )
        publisher("drv", 0)
        addHistory(startingTime, currentHumidity, timeDiff)
        console.log("[SYSTEM]     Watering stopped")
        console.log(
            `[SYSTEM]     Duration: ${timeDiff} ${
                timeDiff > 1 ? "seconds" : "second"
            }`
        )
    }
}
