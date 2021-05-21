const express = require('express')
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
require('dotenv').config()

let {adafruit} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let {settingRoute, modeRoute, powerRoute, authRoute, humidRoute} = require('./router')
let {handleIotButton, checkHumid} = require('./iotFunctions')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/mode', requireAuth, modeRoute)
app.use('/api/power', requireAuth, powerRoute)
app.use('/api/humid', requireAuth, humidRoute)

app.get('/*', requireAuth, (req, res) => {
    res.send("Oke")
})

// Handle input from IOT
adafruit.on('message', (topic, message) => {
    let topicName = feedList.find(feed => feed.link === topic).name
    if (topicName === 'button') {
        handleIotButton(message.toString())
    } else if (topicName === 'humid-sensor') {
        checkHumid(message.toString())
    }
})

app.listen(5000, () => console.log("Server is running"))
