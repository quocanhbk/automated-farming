const { dbConn } = require("./connection")
const {query: queryHelper} = require('./helper')
const { runDrv, addHistory } = require("./utils")

let mode = "IDLE"
let startingTime = new Date()
let currentHumidity = 0
exports.getSystemMode = () => {
    return mode
}
exports.setHumidity = (humidity) => {
    currentHumidity = humidity
}
exports.toggleSystemMode = async () => {
    // toggle from "IDLE" to "WATERING"
    if (mode === "IDLE") {
        mode = "WATERING"
        // run drv 
        let power = (await queryHelper(dbConn, "SELECT power FROM motor WHERE system_id = 101"))[0]
        console.log("[SYSTEM]     Starting to water")
        runDrv(power)
    }
    // toggle from "WATERING" to "IDLE"
    else {
        mode = "IDLE"
        let timeDiff = Math.round(((new Date()).getTime() - startingTime.getTime()) / 1000)
        runDrv(0)
        addHistory(startingTime, currentHumidity, timeDiff)
        console.log("[SYSTEM]     Watering stopped")
        console.log(`[SYSTEM]     Duration: ${timeDiff}`)
    }
}