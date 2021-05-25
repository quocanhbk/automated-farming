const express = require('express')
const router = express.Router()
const schedule = require('node-schedule')
const fetch = require('node-fetch')
let { dbConn, adafruit } = require('../connection')

router.get('/:amount', (req, res) => {
    selectMessage(Number(req.params.amount), res)

})

router.get('', (req, res) => {
    selectMessage(48, res)
})

function selectMessage(amount, res) {
    let select_query = "SELECT mtime, humidity_value FROM message WHERE system_id = 101"
    dbConn.query(select_query, function (err, result) {
        if (err) {
            res.status(400).json({
                message: err.sqlMessage
            })
        }
        else {
            let length = amount
            let message = {message :[]}
            if (result.length < amount) length = result.length
            for (let index = 0; index < length; index++) {
                console.log(result[index])
                let temp = {
                    time: result[index].mtime,
                    humidity: result[index].humidity_value
                }
                message.message.push(temp)
            }
            res.status(200).json(message.message)
        }
    })
}

module.exports = router;