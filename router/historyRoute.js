const express = require('express')
const router = express.Router()

router.get('/:amount', (req, res) => {
    let amount = req.params.amount || 10
    let query = `SELECT htime, humidity_value, duration FROM farm.history ORDER BY htime DESC LIMIT ${amount}`
    
    dbConn.query(query, (err, result) => {
        if(err) res.status(400).json({error: err}) 
        let history = result.map(res => ({
            time : res.htime,
            humidity: res.humidity_value,
            duration: res.duration
        }))
        res.status(200).json(history)
    });
})

module.exports = router