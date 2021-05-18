const express = require('express')
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
require('dotenv').config()

let {dbConn, adafruit} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let settingRoute = require('./router/settingRoute')
let modeRoute = require('./router/modeRoute')
let powerRoute = require('./router/powerRoute')
let authRoute = require('./router/authRoute')
let {handleIotButton} = require('./iotFunctions')
const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoute)
app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/mode', requireAuth, modeRoute)
app.use('/api/power', requireAuth, powerRoute)


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

        dbConn.query(q, [top, bottom, '101'], function (err, result) {
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

// Handle input from IOT
adafruit.on('message', (topic, message) => {
    let topicName = feedList.find(feed => feed.link === topic).name
    if (topicName === 'button') {
        handleIotButton(message.toString())
    }
})

app.listen(5000, () => console.log("Server is running"))
