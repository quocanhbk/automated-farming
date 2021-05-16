const express = require('express')
const mqtt = require('mqtt')
const feedList = require('./feedList')
require('dotenv').config()
conn = require('dbadd.js')

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

app.post('/humid', (req, res) => {
    let top = req.body.top
    let bottom = req.body.bottom;
    
    if (top && bottom) {
        if (top > 1023 * 2.55) {
            res.status(400).send({error: "Top value too high"});
        } else if(bottom < 0) {
            res.status(400).send({error: "Bottom value toooo low"});
        }

        var message = {
            "top": top,
            "bottom": bottom
        };
        var humid = feedList[3]
        client.publish(humid.link, message)
        res.status(200).send({
            status: "Added top and bottom value successfully",
            topic: humid.name,
            feed: humid.link,
            message: message
        })
    } else {
        res.status(400).send({error: "Must have both top and bottom value"})
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