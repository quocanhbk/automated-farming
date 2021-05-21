let express = require('express')
let router = express.Router();
const feedList = require('../feedList')
let {dbConn, adafruit} = require('../connection')


router.post('/',(req,res) =>{
    let feed1 = feedList.find(feed => feed.name == "relay")
    let feed2 = feedList.find(feed => feed.name == "led")
    let feed3 = feedList.find(feed => feed.name == "buzzer")
    console.log(feed1)
    console.log(feed2)
    let a1 = `SELECT sstatus FROM mainsystem WHERE id = 101`
    dbConn.query(a1,function(err,result1){
        if(err) res.json({error: err})
        else{
            let status = result1[0]["sstatus"]
            let p = `UPDATE mainsystem SET sstatus = ${!status} WHERE id = 101`;
            dbConn.query(p,function(err, result2) {
            if (err) res.json({error: err})
            else {
                let num =  status == 1?"off":"on"
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
                let message3 = {
                    id: "3",
                    name: "SPEAKER",
                    data: 1000,
                    unit:""
                }
                adafruit.publish(feed1.link, message1)
                adafruit.publish(feed2.link, message2)
                if (num == "on"){
                setTimeout(function () {
                    adafruit.publish(feed3.link, message3);
                  }, 1000);}
                res.status(200).json({"status": num})
                }
            })
        }
    })
})   
        


router.get('/', (req, res) => { 
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    dbConn.query(q,function(err, result){
        if (err) res.json({error: err})
        else { 
            let power = result[0]["sstatus"] == 1 ? "on":"off"
            res.status(200).json({"power": power})
        }
    })

})
module.exports = router;
