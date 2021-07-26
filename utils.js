const { dbConn, adafruit } = require("./connection")
const feedList = require("./feedList")
const { query } = require("./helper")
const moment = require("moment")

exports.getHumidityLimit = async () => {
    let queryCommand =
        "SELECT upper_bound, lower_bound FROM farm.sensor WHERE system_id = '101'"
    let { upper_bound: top, lower_bound: bottom } = (
        await query(dbConn, queryCommand)
    )[0]
    return { top, bottom }
}
exports.getWateringMode = async () => {
    let m = `SELECT smode FROM mainsystem WHERE id = 101`
    let { smode } = (await query(dbConn, m))[0]
    return smode
}
exports.addHistory = async (time, humidity, duration) => {
    let now = moment(time).format("YYYY-MM-DD HH:mm:ss")
    let query = `INSERT INTO history (system_id, htime, humidity_value, duration) VALUES ("101", "${now}", ${humidity}, ${duration})`
    dbConn.query(query, (err, result) => {
        if (err) console.log(err.sqlMessage)
    })
}
