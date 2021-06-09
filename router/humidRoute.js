var express = require('express')
var router = express.Router();
const {dbConn} = require('../connection')

router.get('/', (req, res) => {
    let query = "SELECT upper_bound, lower_bound FROM farm.sensor WHERE system_id = '101'"

    dbConn.query(query, (err, result) => {
        if (err) res.status(400).json({error: err.sqlMessage})
        else {
            let {upper_bound: top, lower_bound: bottom} = result[0]
            res.status(200).json({top, bottom})
        }
    });
})

router.post('/', (req, res) => {
    let {top, bottom} = req.body
    let query = `UPDATE farm.sensor SET upper_bound = ${top} , lower_bound = ${bottom} WHERE system_id = '101'`;

    dbConn.query(query, (err, result) => {
        if (err) res.status(400).json({error: err.sqlMessage})
        else res.status(200).json({message: "update_humid_success"})
    })  
})
module.exports = router;
