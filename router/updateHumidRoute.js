const express = require('express')
const router = express.Router()
const feedList = require('../feedList')
const schedule = require('node-schedule')
const fetch = require('node-fetch')
let checkHumid = require('../iotFunctions')
let sendHumidLCD = require('../iotFunctions')
let { dbConn, adafruit } = require('../connection')
var dateFormat = require('dateformat')

router.post('/', (req, res) => {
    var cronExpress = "*/1 * * * * *"
    let hour = 0
    let min = 0
    let sec = 10 // 1 --> 1000
    let waitTime = (hour * 3600 + min * 60 + sec) * 1000
    let start = new Date()
    let end = new Date()

    res.status(200).json({
        message: "update humid",
        hour: hour,
        minute: min,
        second: sec
    })
    updateHumid(res)

    var job = schedule.scheduleJob(cronExpress, function () {
        end = new Date()
        if (end - start > waitTime) {
            updateHumid(res)
            start = end
        }
    })

})

function updateHumid(res) {
    let str_query = "SELECT sstatus FROM mainsystem WHERE 1"
    dbConn.query(str_query, function (err, result) {
        if (err) {
            res.status(400).json({
                message: err
            })
        }
        else {
            sstatus = result[0].sstatus
            if (sstatus == 1) {
                var user = process.env.IO_USERNAME
                var pass = process.env.IO_PASSWORD
                let https_link = "https://io.adafruit.com/api/v2/" + user + "/feeds/humid-sensor/data/last?x-aio-key=" + pass
                let promesa = fetch(https_link)
                promesa.then((res) => {
                    return res.json()
                }).then((json) => {
                    let value = Number(json.value)
                    var time = Number(Date.parse(json.created_at))
                    // console.log(https_link)
                    var time = new Date(time)
                    time = dateFormat(time, "yyyy-mm-dd hh:mm:ss")
                    sendHumidLCD(value.toString())
                    // console.log(time)
                    let ins_query = "INSERT INTO message (system_id, mtime, humidity_value) VALUES (101, TIMESTAMP('" + time + "'), " + value + ")"
                    // let upd_query = "UPDATE message SET mtime = TIMESTAMP('" + time + "'), humidity_value = " + value + " WHERE 101"
                    // console.log(upd_query)
                    dbConn.query(ins_query, function (err, res) {
                        if (err) {
                            console.log(err.sqlMessage)
                        }
                        else {
                            console.log("Insert: " + res.affectedRows + " row(s)")
                        }
                    })
                    str_query = "SELECT smode FROM mainsystem WHERE id = 101"
                    dbConn.query(str_query, function (err, result) {
                        if (err) {
                            res.status(400).json({
                                message: err
                            })
                        }
                        else {
                            smode = result[0].smode
                            if (smode == 1) {
                                // Call checkHumid 
                                // console.log("Check humid")
                                checkHumid(value)
                            }
                        }
                    })
                })
            }
        }
    })
}

module.exports = router;
