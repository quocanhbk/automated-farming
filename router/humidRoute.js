var express = require('express')
var router = express.Router();
const {dbConn} = require('../connection')

router.get('/', (req, res) => {
    let q = "SELECT upper_bound, lower_bound FROM farm.sensor WHERE system_id = '101'"

    dbConn.query(q, [true], function (err, result) {
        if (err) throw err;
        let top = result[0].upper_bound
        let bottom = result[0].lower_bound
        if (top && bottom) 
            return res.status(200).json({
                top: top,
                bottom: bottom
            }) 
        else return res.status(400).send({ error: "Missing top or bottom value" })
      });
})

router.post('/', (req, res) => {
    let top = req.body.top;
    let bottom = req.body.bottom;

    if (top && bottom) {
        if (top > 1023 * 2.55) {
            return res.status(400).send({ error: "Top value too high" });
        } else if (bottom < 0) {
            return res.status(400).send({ error: "Bottom value too low" });
        } else if (top < bottom) return res.status(400).send({ error: "Bottom value is higher than top value" })

        let q = `UPDATE farm.sensor
        SET upper_bound = ? , lower_bound = ?
        WHERE system_id = '101'`;

        dbConn.query(q, [top, bottom, '101'], function (err, result) {
            if (err) return console.error(err.message);
            return res.status(200).send({
                message: "Updated top and bottom value successfully",
            })
        })
    } else {
        return res.status(400).send({ error: "Must have both top and bottom value" })
    }
})
module.exports = router;
