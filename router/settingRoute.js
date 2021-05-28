const express = require('express')
const router = express.Router()
let {dbConn} = require('../connection.js')

router.get('/', (req, res) => {
    let str_query = "SELECT power FROM motor WHERE system_id = 101"
    dbConn.query(str_query, function (err, result) {
        if (err) res.status(400).json({error: err.sqlMessage})
        res.status(200).json({setting: result[0].power})
    })
})

router.post('/', (req, res) => {
    let {setting} = req.body

    let upd_query = `UPDATE motor SET power = ${setting} WHERE system_id = 101`
    dbConn.query(upd_query, [setting], function (err, result) {
        if (err) res.status(400).json({error: err.sqlMessage})
        res.status(200).json({message: "success"})
    })
})

module.exports = router