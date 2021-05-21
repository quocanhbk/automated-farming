let express = require('express')
let router = express.Router();
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
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    dbConn.query(q,function(err, result){
        if (err) res.json({error: err})
        else { 
            let power = result[0]["sstatus"] == 1 ? "on":"off"
            if(power = "on"){
                let message3 = {
                    id: "3",
                    name: "SPEAKER",
                    data: 1000,
                    unit:""
                }
                setTimeout(function () {
                adafruit.publish(feed3.link, message3);
                }, 1000);}
            }
        }
    )
