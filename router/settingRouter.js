const express = require('express')
const router = express.Router()
const feedList = require('../feedList')
let {dbConn, adafruit} = require('../connection.js')

router.get('/', (req, res) => {
    let str_query = "SELECT power FROM motor WHERE system_id = 101"
    dbConn.query(str_query, function (err, result) {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        else {
            res.status(200).json({
                setting: result[0].power
            })
        }
    })
})

router.post('/', (req, res) => {
    let feed = feedList.find(feed => feed.name == "drv")
    let setting = req.body.setting
    if (setting >= 0 && setting <= 100) {
        let message = {
            "setting": "Success!"
        }
        let topic = {
            id: "10",
            name: "DRV_PWM",
            data: Math.round(setting * 2.55),
            unit: ""
        }
        let upd_query = "UPDATE motor SET power = ? WHERE system_id = 101"
        dbConn.query(upd_query, [setting], function (err, result) {
            if (err) {
                res.status(400).json({
                    error: err
                })
            }
            else {
                adafruit.publish(feed.link, topic)
                res.status(200).json(message)
            }
        })
    }
    else {
        res.status(400).json({
            error: "Error, Invalid value!"
        })
    }
})

module.exports = router