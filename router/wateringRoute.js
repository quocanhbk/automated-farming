const { default: axios } = require('axios')
const express = require('express')
const {dbConn, adafruit} = require('../connection')
const feedList = require('../feedList')
const router = express.Router()

router.post('/:duration', async (req, res) => {
    let duration = req.params.duration
    let drvFeedLink = feedList.find(feed => feed.name === "drv").link
    // get the current setting
    let currentSetting = 0;
    let str_query = "SELECT power FROM motor WHERE system_id = 101"
    dbConn.query(str_query, function (err, result) {
        if (err) currentSetting = 50
        else currentSetting = result[0].power
        console.log(currentSetting)
        //turn on drv
        adafruit.publish(drvFeedLink, JSON.stringify({
            id: 10,
            name: "DRV_PWN",
            data: Math.round(currentSetting * 2.55),
            unit: ""
        }))
        let time = duration
        let count = setInterval(() => {
            time -= 1
            console.log(`Watering..., ${time} seconds left`)
        }, 1000);
        // after duration, turn off drv
        setTimeout(() => {
            adafruit.publish(drvFeedLink, JSON.stringify({
                id: 10,
                name: "DRV_PWN",
                data: 0,
                unit: ""
            }))
            clearInterval(count)
            res.json({message: "Done"})
        },duration * 1000)
    })
})

module.exports = router