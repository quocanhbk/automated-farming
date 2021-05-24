const express = require('express')
const router = express.Router()
const feedList = require('../feedList')
const schedule = require('node-schedule')
const rule = new schedule.RecurrenceRule()
let {dbConn, adafruit} = require('../connection.js')


router.get('/', (req,res) => {

})

router.post('/', (req,res) => {
    let feed_hs = feedList.find(feed => feed.name == "humid-sensor")
    let feed_lcd = feedList.find(feed => feed.name == "lcd")
    let value = 0 // đọc dữ liệu từ sensor 
    
    rule.hour = 0 // hour (0 - 23)
    rule.minute = 0 // minute (0 - 59)
    rule.second = 3 // second(0 - 59)

    let count = 0

    let job = schedule.scheduledJobs(rule, function() {
        count += 1
        console.log(count)
    })

    // let str_query = ""
    // dbConn.query(str_query, function(err,result) {
    //     if (err) {
    //         res.status(400).json({
    //             error: err
    //         })
    //     }
    //     else {
    //         console.log(result)
    //     }
    // })
})