const express = require('express')
const mqtt = require('mqtt')
const feedList = require('./feedList')
require('dotenv').config()
// conn = require('dbadd.js')

const app = express()
app.use(express.json())

const client = mqtt.connect('https://io.adafruit.com', {
    username: process.env.IO_USERNAME,
    password: process.env.IO_PASSWORD
})

//Connect and subscribe to adafruit server
client.on('connect', () => {
    console.log("Connected to adafruit successfully")
    client.subscribe(feedList.map(feed => feed.link), (err) => {
        if (!err) console.log("Subscribe to all feeds")
    })
})

// Message received from subscibed topics
client.on('message', (topic, message) => {
    console.log("- Receive a message from", topic, ": ", message.toString())
})

app.post('/api/setting', (req, res) => {
    let feed = feedList.find(feed => feed.name == req.body.topic)
    let setting = req.body.setting 
    if (setting >= 0 && setting <= 100)
    {
        let message = "Bạn đã điều chỉnh công suất bơm!"
        client.publish(feed.link, message)
        res.json({
            status: "Success",
            topic: req.body.topic,
            feed: feed.link,
            setting: setting
        })
    }
    else
    {
        res.send("Error, Invalid value!")
    }
})

app.post('/pub', (req, res) => {
    let message = req.body.message
    let feed = feedList.find(feed => feed.name === req.body.topic)
    
    if (!feed) {
        res.send("Invalid topic")
    } else if (message && feed) {
        client.publish(feed.link, message)
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

app.listen(5000, () => console.log("Server is running"))