const feedList = require('./feedList')
const {dbConn,adafruit} = require('./connection')
const { default: axios } = require('axios')
const moment = require('moment')
const {query: queryHelper} = require('./helper')
require("dotenv").config()

const handleIotButton = () => {
    let relayFeed = feedList.find(feed => feed.name == "relay").link
    let ledFeed = feedList.find(feed => feed.name == "led").link
    let query = `SELECT sstatus FROM mainsystem WHERE id = 101`
    dbConn.query(query, function(err,result){
        if(err) throw err

        let newStatus = result[0]["sstatus"] === 0 ? 1 : 0
        let query = `UPDATE mainsystem SET sstatus = ${newStatus} WHERE id = 101`;
        
        dbConn.query(query, (err, result) => {
            if (err) res.json({error: err})
            
            adafruit.publish(relayFeed, JSON.stringify({
                id: "11",
                name:"RELAY",
                data: newStatus,
                unit: "" 
            }))
            adafruit.publish(ledFeed, JSON.stringify({
                id: "1",
                name: "LED",
                data: newStatus === 1 ? "2" : "1",
                unit: ""
            }))
        })
    })
}

// gửi thông báo buzzer
const runBuzzer = () => {
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    dbConn.query(q,function(err, result){
        if (err) throw err

        if (result[0]["sstatus"] === 1) {
            let buzzerFeed = feedList.find(feed => feed.name === 'buzzer').link
            // turn the buzzer on
            adafruit.publish(buzzerFeed, JSON.stringify({
                id: "3", 
                name: "SPEAKER", 
                data: "1000", 
                unit: ""
            }))
            // after 1 second, turn the buzzer off
            setTimeout(function () {
                adafruit.publish(buzzerFeed, JSON.stringify({
                    id: "3", 
                    name: "SPEAKER", 
                    data: "0", 
                    unit: ""
                }))
            }, 1000);}
        }
    )
}

//kiểm tra độ ẩm
const autoWatering = (message) => {
    console.log("Auto watering ...")
    // let drvFeed = feedList.find(feed => feed.name === "drv")
    // let humid = message.data
    
    // let query = `SELECT upper_bound, lower_bound FROM farm.sensor WHERE system_id = '101'`
    // dbConn.query(query, (err, result) => {
    //     if (err) throw err;
    //     let {upper_bound: top, lower_bound: bottom} = result[0]

    //     let q2 = `SELECT sstatus FROM farm.mainsystem WHERE id = 101`
    //     let power = 0
    //     dbConn.query(q2, (err, result) => {
    //         if (err) throw err
    //         power = result[0].sstatus
    //     })
    //     if (power === 1) {

    //     }
    //     dbConn.query(q2,function(err,result1){
    //         if (err) res.json({error: err})
    //         let power = result1[0].sstatus
    //         if (power == 1) { 
    //             if (humid < bottom) { // cho data của DRV lên 100 để tự động tưới khi đổ ẩm dưới ngưỡng bottom
    //                 adafruit.publish(feed.link, mess[0])
    //                 let q3 = `INSERT INTO farm.history (system_id, htime, humidity_value, duration) VALUES ('101', ? , ?, 1)`
    //                 dbConn.query(q3,[d, humid], function (err, result4) {
    //                     if (err) res.json({error: err})
    //                     console.log("Inserted")
    //                 })
    //             } 
    //             if (humid > stopvalue)
    //             { // cho data của DRV về 0 khi độ ẩm lớn hơn stop value 
    //                 adafruit.publish(feed.link, mess[1])
    //             } 
    //         } else return console.log('Power is off')
    //     })
    // });    
}

const writeLCD = (text) => {
    let feed = feedList.find(feed => feed.name == "lcd")
    adafruit.publish(feed.link, JSON.stringify({
        id: 5,
        name: "LCD",
        data: text.toString(),
        unit: ""
    }))
}

const checkHumidScheduler = async () => {
    // check current power, if "off", return
    let powerRes = await queryHelper(dbConn, "SELECT sstatus FROM mainsystem WHERE id = 101").catch(console.log)
    let power = powerRes[0]["sstatus"]

    if (power === 0) return
    process.stdout.write(`SCHEDULE: Checking current humidity at ${moment().format('YYYY-MM-DD HH:mm:ss')}...`)
    const humidValue = (await axios.get('https://io.adafruit.com/api/v2/quocanhbk17/feeds/humid-sensor/data/last', {
        headers: {
            'X-AIO-Key': process.env.IO_PASSWORD
        }
    })).data.value
    console.log(`RESULT: ${humidValue}`)
    let now = moment().format('YYYY-MM-DD HH:mm:ss');
    // insert into message database
    let query = `INSERT INTO message (system_id, mtime, humidity_value) VALUES ("101", "${now}", ${humidValue})`
    dbConn.query(query, (err, result) => {
        if (err) console.log(err.sqlMessage)
    })
    // write into LCD
    writeLCD(`Humidity: ${humidValue}`)

    // check current Mode
    let modeRes = await queryHelper(dbConn, "SELECT smode FROM mainsystem WHERE id = 101").catch(console.log)
    let mode = modeRes[0]["smode"]
    if (mode === 1)
        autoWatering()
}

module.exports = {
    handleIotButton, 
    runBuzzer, 
    autoWatering, 
    writeLCD,
    checkHumidScheduler
}