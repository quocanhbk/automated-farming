const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
require('dotenv').config()


let {adafruit} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let {settingRoute, modeRoute, powerRoute, historyRoute, authRoute, humidRoute, getMessageRoute, wateringRoute} = require('./router')
let {handleIotButton, checkHumidScheduler} = require('./iotFunctions')

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/mode', requireAuth, modeRoute)
app.use('/api/power', requireAuth, powerRoute)
app.use('/api/humid', requireAuth, humidRoute)
app.use('/api/message', getMessageRoute)
app.use('/api/history', requireAuth, historyRoute)
app.use('/api/watering', requireAuth, wateringRoute)
app.get('/', (req, res) => {
    res.send("Oke")
})

// Handle input from IOT
adafruit.on('message', (topic, message) => {
    let topicName = feedList.find(feed => feed.link === topic).name
    if (topicName === 'button'){
        console.log(message.toString().data)
        handleIotButton()
    }
        
    //console.log(`${topic} : ${message.toString()}`)
})

const scheduler = new ToadScheduler()
const task = new Task('simple', () => {
    checkHumidScheduler()
})
const job = new SimpleIntervalJob({seconds: 5}, task)

scheduler.addSimpleIntervalJob(job)

app.listen(5000, () => console.log("Server is running"))
