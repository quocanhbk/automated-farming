const mqtt = require('mqtt');
const  mysql = require('mysql');

const dbConn = mysql.createConnection({
  host: "mysql-30814-0.cloudclusters.net",
  port: 30848,
  user: "staff",
  password: "password",
  database: "farm"
});

dbConn.connect(function(err) {
  if (!err) console.log("Connected to database!");
  else console.log("Failed to connect to database")
});


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

// // Message received from subscibed topics
// adafruit.on('message', (topic, message) => {
//     console.log("- Receive a message from", topic, ": ", message.toString())
// })

module.exports = {dbConn, adafruit}