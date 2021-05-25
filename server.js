const express = require('express')
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
require('dotenv').config()

let {adafruit, dbConn} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let {settingRoute, modeRoute, powerRoute, authRoute, humidRoute, updateHumidRoute, getMessageRoute} = require('./router')
let {handleIotButton} = require('./iotFunctions')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/mode', requireAuth, modeRoute)
app.use('/api/power', requireAuth, powerRoute)
app.use('/api/humid', requireAuth, humidRoute)
app.use('/api/update-humid', updateHumidRoute)
app.use('/api/message', getMessageRoute)


app.get('/api/history/:amount', (req, res) => {
    let q = `SELECT htime, humidity_value, duration FROM farm.history ORDER BY htime DESC LIMIT ?`
    if (!req.params['amount']) {
        dbConn.query(q,[10],function(err, result) {
            if(err) res.status(400).send(err) 
            let message = {history :[]}
            for (let index = 0; index < result.length; index++) {
                messobj = {
                    time : result[index].htime,
                    humidity: result[index].humidity_value,
                    duration: result[index].duration
                }
                message.history.push(messobj)
            }
            res.status(200).json(result[0])
        });
    }    
    else {
        let value = req.params['amount'];
        dbConn.query(q,[Number(value)],function(err, result) {
            if(err) res.status(400).send(err)
            console.log(result) 
            let message = {history :[]}
            for (let index = 0; index < result.length; index++) {
                messobj = {
                    time : result[index].htime,
                    humidity: result[index].humidity_value,
                    duration: result[index].duration
                }
                message.history.push(messobj)
            }
            res.status(200).json(message)
        });
    }
})

app.get('/*', requireAuth, (req, res) => {
    res.send("Oke")
})

// Handle input from IOT
adafruit.on('message', (topic, message) => {
    let topicName = feedList.find(feed => feed.link === topic).name
    if (topicName === 'button') {
        handleIotButton(message.toString())
    }
})


app.listen(5000, () => console.log("Server is running"))
