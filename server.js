const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const app = express();
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
require('dotenv').config()

let {adafruit} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let {settingRoute, modeRoute, powerRoute, historyRoute, authRoute, humidRoute, messageRoute, wateringRoute} = require('./router')
let {handleIotButton, checkHumidScheduler, handleSensorInput, startManualWatering, stopManualWatering} = require('./iotFunctions')

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/mode', requireAuth, modeRoute)
app.use('/api/power', requireAuth, powerRoute)
app.use('/api/humid', requireAuth, humidRoute)
app.use('/api/message', messageRoute)
app.use('/api/history', requireAuth, historyRoute)
app.use('/api/watering', requireAuth, wateringRoute)
app.get('/', (req, res) => {
    res.send("Oke")
})

// Handle input from IOT
adafruit.on('message', (topic, message) => {
    let topicName = feedList.find(feed => feed.link === topic).name
    let messageData = parseInt(JSON.parse(message.toString()).data)
    if (topicName === 'button' && messageData === 1)
        handleIotButton()
    if (topicName === 'humid-sensor')
        handleSensorInput(messageData)

})

// check humidity every 40 minutes
const scheduler = new ToadScheduler()
const task = new Task('simple', () => {
    checkHumidScheduler()
})
const job = new SimpleIntervalJob({minutes: 40}, task)
scheduler.addSimpleIntervalJob(job)

// setTimeout(() => {
//     checkHumidScheduler()
// }, 2000)

const server = http.createServer(app)
const io = new Server(server)

io.on("connection", socket => {
    console.log('[SYSTEM]     New User Connected')
    socket.on("watering", (message) => {
        if (message === "start")
            startManualWatering()
        else if (message === "stop")
            stopManualWatering()
    })
})
server.listen(5000, () => console.log("[SERVER]     Running"))
