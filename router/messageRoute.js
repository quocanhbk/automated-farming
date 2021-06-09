const express = require('express')
const router = express.Router()
let { dbConn} = require('../connection')

router.get('/:amount', (req, res) => {
    let amount = req.params.amount || 48
    let select_query = `SELECT mtime, humidity_value FROM message WHERE system_id = 101 ORDER BY mtime DESC LIMIT ${amount}`
    dbConn.query(select_query, (err, result) => {
        if (err) res.status(400).json({error: err})
        let message = result.map(res => ({time: res.mtime, humidity: res.humidity_value}))
        res.status(200).json({message})
    })
})

module.exports = router;