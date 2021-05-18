const express = require('express')
const mqtt = require('mqtt')
const feedList = require('./feedList')
require('dotenv').config()
let conn = require('./dbadd.js')

let settingRouter = require('./router/settingRouter')

const app = express()
app.use(express.json())

const adafruit = mqtt.connect('https://io.adafruit.com', {
    username: process.env.IO_USERNAME,
    password: process.env.IO_PASSWORD
})

//Connect and subscribe to adafruit server
adafruit.on('connect', () => {
    console.log("Connected to adafruit successfully")
    adafruit.subscribe(feedList.map(feed => feed.link), (err) => {
        if (!err) console.log("Subscribe to all feeds")
    })
})

// Message received from subscibed topics
adafruit.on('message', (topic, message) => {
    console.log("- Receive a message from", topic, ": ", message.toString())
})

app.use('/api/setting', settingRouter)

app.post('/api/setting', (req, res) => {
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
        conn.query(upd_query, [setting], function (err, result) {
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

app.get('/api/setting', (req, res) => {
    let str_query = "SELECT power FROM motor WHERE system_id = 101"
    conn.query(str_query, function (err, result) {
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

app.put('/humid', (req, res) => {
    let top = req.body.top;
    let bottom = req.body.bottom;

    if (top && bottom) {
        if (top > 1023 * 2.55) {
            return res.status(400).send({ error: "Top value too high" });
        } else if (bottom < 0) {
            return res.status(400).send({ error: "Bottom value too low" });
        } else if (top < bottom) return res.status(400).send({ error: "Bottom value is higher than top value" })

        var message = {
            "top": top,
            "bottom": bottom
        };
        var humid = feedList[3]
        let q = `UPDATE farm.sensor
        SET upper_bound = ? , lower_bound = ?
        WHERE system_id = '101'`;

        conn.query(q, [top, bottom, '101'], function (err, result) {
            if (err) return console.error(err.message);
            return res.status(200).send({
                status: "Added top and bottom value successfully",
                topic: humid.name,
                feed: humid.link,
                message: message
            })
        })
    } else {
        return res.status(400).send({ error: "Must have both top and bottom value" })
    }
})

app.post('/pub', (req, res) => {
    let message = req.body.message
    let feed = feedList.find(feed => feed.name === req.body.topic)

    if (!feed) {
        res.send("Invalid topic")
    } else if (message && feed) {
        adafruit.publish(feed.link, message)
        res.json({
            status: "Success",
            topic: req.body.topic,
            feed: feed.link,
            message: message
        })
    } else {
        res.send("Body must contain topic and message")
    }
})

app.post('/api/power', (req, res) => {
    let power = req.body.power
    var num = power == "on" ? 1 : 0

    let p = `UPDATE mainsystem SET sstatus = ${num} WHERE id = 101`;
    conn.query(p, function (err, result) {
        if (err) res.json({ error: err })
        else res.status(200).json({ status: "success" })
    })

}
)

app.get('/api/power', (req, res) => {
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    conn.query(q, function (err, result) {
        if (err) res.json({ error: err })
        else {
            let power = result[0]["sstatus"] == 1 ? "on" : "off"
            res.status(200).json({ "power": power })
        }
    })

})

app.listen(5000, () => console.log("Server is running"))