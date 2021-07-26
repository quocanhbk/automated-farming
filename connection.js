const mqtt = require("mqtt")
const mysql = require("mysql")
const feedList = require("./feedList")
require("dotenv").config()
const dbConn = mysql.createConnection({
    host: "mysql-40882-0.cloudclusters.net",
    port: 19426,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "farm",
})

dbConn.connect(function (err) {
    if (!err) console.log("[DATABASE]   Connected successfully")
    else console.log("[DATABASE]  Failed to connect")
})

const cse_bbc = mqtt.connect("https://io.adafruit.com", {
    username: process.env.ADAFRUIT_USER1,
    password: process.env.ADAFRUIT_PASSWORD1,
})
const cse_bbc1 = mqtt.connect("https://io.adafruit.com", {
    username: process.env.ADAFRUIT_USER2,
    password: process.env.ADAFRUIT_PASSWORD2,
})
// CSE_BBC includes:
// * bk-iot-button
// * bk-iot-drv
// * bk-iot-lcd
// * bk-iot-led
// * bk-iot-soil
cse_bbc.on("connect", () => {
    console.log("[CSE_BBC]    Connected successfully")
    cse_bbc.subscribe(["CSE_BBC/feeds/bk-iot-soil"], (err) => {
        if (!err)
            console.log("[CSE_BBC]    Subscribed to soil sensor successfully")
        else console.log("[CSE_BBC]	   Error:", err.message)
    })
})
// CSE_BBC1 includes:
// * bk-iot-relay
cse_bbc1.on("connect", () => {
    console.log("[CSE_BBC1]   Connected successfully")
})

module.exports = { dbConn, cse_bbc, cse_bbc1 }
