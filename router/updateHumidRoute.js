const express = require('express')
const router = express.Router()
const feedList = require('../feedList')
let {dbConn, adafruit} = require('../connection.js')

router.get('/', (req,res) => {

})

router.post('/', (req,res) => {
    let feed = feedList.find(feed => feed.name == "humid-sensor")
    let str_query = ""
    dbConn.query(str_query, function(err,result) {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        else {
            console.log(result)
        }
    })
})