const feedList = require('./feedList')
const {dbConn,adafruit} = require('./connection')


module.exports.handleIotButton = (message) => {
    console.log(message)
    if (message.data == 0) {
        let a1 = `SELECT sstatus FROM mainsystem WHERE id = 101`
        dbConn.query(a1,function(err,result1){
        let status = result1[0]["sstatus"]
        let p = `UPDATE mainsystem SET sstatus = ${!status} WHERE id = 101`;
            dbConn.query(p,function(err, result2) {
            if (err) res.json({error: err})
            else {
                let message1 = {
                    id: "11",
                    name:"RELAY",
                    data:!status,
                    unit:""
                }
                let message2 = {
                    id: "1",
                    name: "LED",
                    data:!status,
                    unit:""
                }
                adafruit.publish('quocanhbk17/feeds/relay', JSON.stringify(message1))
                adafruit.publish('quocanhbk17/feeds/led', JSON.stringify(message2))
                
                }
            })
        })
    }
}

// gửi thông báo buzzer
module.export = function runBuzzer() {
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    dbConn.query(q,function(err, result){
        if (err) throw err
        else { 
            let power = result[0]["sstatus"] == 1 ? "on":"off"
            if (power === "on") {
                let buzzerTopic = feedList.find(feed => feed.name === 'buzzer').link
                // turn the buzzer on
                adafruit.publish(buzzerTopic, {id: "3", name: "SPEAKER", data: "1000", unit: ""})
                // after 1 second, turn the buzzer off
                setTimeout(function () {
                    adafruit.publish(buzzerTopic, {id: "3", name: "SPEAKER", data: "0", unit: ""});
                }, 1000);}
            }
        }
    )
}

    //kiểm tra độ ẩm
module.exports = function checkHumid(message) {
    let feed = feedList.find(feed => feed.name == "drv")
    let currentHumid = Number(message.data)
    
    let q1 = `SELECT upper_bound, lower_bound FROM farm.sensor WHERE id = '101'`
    dbConn.query(q1, [true], function (err, result) {
        if (err) throw err;
        let {upper_bound: top, lower_bound: bottom} = result[0]
        if (top && bottom) {
            if (currentHumid < bottom) {
                var mess = {
                    id: "10",
                    name: "DRV_PWM",
                    data: 100 * 2.55,
                    unit:""
                } 
            }
            else {
                var mess = {
                    id: "10",
                    name: "DRV_PWM",
                    data: 0,
                    unit:""
                }
            }
        } else return res.status(400).send({ error: "Missing top or bottom value" })
        
        let q2 = `SELECT sstatus FROM farm.mainsystem WHERE id = '101'`
        dbConn.query(q2,function(err,result1){
            if (err) res.json({error: err})
            let power = result[0].sstatus
            if (power == 1) { 
                adafruit.publish(feed.link, mess)
            } else console.log("Power is off")
        })
    });      
}
    