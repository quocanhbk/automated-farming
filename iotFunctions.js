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
        let feed = feedList.find(feed => feed.name === "drv")
        let humid = message.data

        let mess = [{
            id: "10",
            name: "DRV_PWM",
            data: "100",
            unit:""
            },{
            id: "10",
            name: "DRV_PWM",
            data: 0,
            unit:""
            }]        
        let q1 = `SELECT upper_bound, lower_bound FROM farm.sensor WHERE system_id = '101'`
        dbConn.query(q1, [true], function (err, result) {
            if (err) throw err;
            let top = result[0].upper_bound
            let bottom = result[0].lower_bound
            let stopvalue = (bottom + top * 3) / 4; // Giá trị ngừng tưới nằm giữa top với bottom (VD top 100 bottom 60 => stop value = 90)
            if (top && bottom) {
                let q2 = `SELECT sstatus FROM farm.mainsystem WHERE id = 101`
                let d = new Date();
                dbConn.query(q2,function(err,result1){
                    if (err) res.json({error: err})
                    let power = result1[0].sstatus
                    if (power == 1) { 
                        if (humid < bottom) { // cho data của DRV lên 100 để tự động tưới khi đổ ẩm dưới ngưỡng bottom
                            adafruit.publish(feed.link, mess[0])
                            let q3 = `INSERT INTO farm.history (system_id, htime, humidity_value, duration) VALUES ('101', ? , ?, 1)`
                            dbConn.query(q3,[d, humid], function (err, result4) {
                                if (err) res.json({error: err})
                                console.log("Inserted")
                            })
                        } 
                        if (humid > stopvalue)
                        { // cho data của DRV về 0 khi độ ẩm lớn hơn stop value 
                            adafruit.publish(feed.link, mess[1])
                        } 
                    } else return console.log('Power is off')
                })
            } else return res.status(400).send({ error: "Missing top or bottom value" })
        });    
    }
