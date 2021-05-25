const express = require('express')
const router = express.Router()
const feedList = require('../feedList')
const schedule = require('node-schedule')
const fetch = require('node-fetch')
let checkHumid = require('../iotFunctions')
let sendHumidLCD = require('../iotFunctions')
let { dbConn, adafruit } = require('../connection')


router.get('/', (res) => {

})

router.post('/', (res) => {
    let feed_hs = feedList.find(feed => feed.name == "humid-sensor")
    let feed_lcd = feedList.find(feed => feed.name == "lcd")

    let hour = "*"
    let min = "*"
    let sec = "5"

    var cronExpress = "*/" + sec + " " + min + " " + hour + " * * *"
    console.log(cronExpress)

    var job = schedule.scheduleJob(cronExpress, function () {
        let str_query = "SELECT sstatus FROM mainsystem WHERE 1"
        dbConn.query(str_query, function (err, result) {
            if (err) {
                throw err;
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
                        var dateFormat = require('dateformat')
                        let value = Number(json.value)
                        var time = Number(Date.parse(json.created_at))
                        // console.log(https_link)
                        var time = new Date(time)
                        time = dateFormat(time, "yyyy-mm-dd hh:mm:ss")
                        sendHumidLCD(value.toString())
                        // console.log(time)
                        // let ins_query = "INSERT INTO message (system_id, mtime, humidity_value) VALUES (101, TIMESTAMP('" + time + "'), " + value + ")"
                        let upd_query = "UPDATE message SET mtime = TIMESTAMP('" + time + "'), humidity_value = " + value + " WHERE 101"
                        // console.log(upd_query)
                        dbConn.query(upd_query, function (err, result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log("Update message")
                            }
                        })
                        str_query = "SELECT smode FROM mainsystem WHERE 1"
                        dbConn.query(str_query, function (err, result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                smode = result[0].smode
                                if (smode == 1) {
                                    // Call checkHumid 
                                    console.log("Check humid")
                                    checkHumid(value)
                                }
                            }
                        })
                    })
                }
            }
        })
    })


})



module.exports = router;
