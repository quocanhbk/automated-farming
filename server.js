const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const app = express();
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
const path = require('path')
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')

require('dotenv').config()
let {adafruit} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let {settingRoute, modeRoute, powerRoute, historyRoute, authRoute, humidRoute, messageRoute, wateringRoute} = require('./router')
let {handleIotButton, checkHumidScheduler, handleSensorInput, startManualWatering, stopManualWatering} = require('./iotFunctions');
const { getSystemMode } = require('./systemMode');

const port = process.env.PORT || 5000

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

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
const job = new SimpleIntervalJob({minutes: 60}, task)
scheduler.addSimpleIntervalJob(job)

const server = http.createServer(app)
const io = new Server(server)

io.on("connection", socket => {
    console.log('[SYSTEM]     New User Connected')
    socket.on("watering", (message) => {
        if (message === "start") {
            let systemMode = getSystemMode()
            if (systemMode === "IDLE") {
                socket.emit("watering", "ok")
                startManualWatering()
            }
            else {
                socket.emit("watering", "rejected")
            }
        }   
        else if (message === "stop") {
            stopManualWatering()
        }
            
    })
})

server.listen(port, () => console.log("[SERVER]     Running"))
