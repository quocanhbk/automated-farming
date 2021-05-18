const express = require('express')
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
require('dotenv').config()
let {dbConn} = require('./connection')
let settingRoute = require('./router/settingRoute')
let authRoute = require('./router/authRoute')
let {requireAuth} = require('./middlewares/authMiddleware')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/auth', authRoute)

app.put('/humid', (req, res) => {
    let top = req.body.top;
    let bottom = req.body.bottom;

    if (top && bottom) {
        if (top > 1023 * 2.55) {
            return res.status(400).send({ error: "Top value too high" });
        } else if (bottom < 0) {
            return res.status(400).send({ error: "Bottom value too low" });
        } else if (top < bottom) return res.status(400).send({ error: "Bottom value is higher than top value" })

        var message = {
            "top": top,
            "bottom": bottom
        };
        var humid = feedList[3]
        let q = `UPDATE farm.sensor
        SET upper_bound = ? , lower_bound = ?
        WHERE system_id = '101'`;

        dbConn.query(q, [top, bottom, '101'], function (err, result) {
            if (err) return console.error(err.message);
            return res.status(200).send({
                status: "Added top and bottom value successfully",
                topic: humid.name,
                feed: humid.link,
                message: message
            })
        })
    } else {
        return res.status(400).send({ error: "Must have both top and bottom value" })
    }
})

app.post('/api/power', (req, res) => {
    let power = req.body.power
    var num = power == "on" ? 1 : 0

    let p = `UPDATE mainsystem SET sstatus = ${num} WHERE id = 101`;
    dbConn.query(p, function (err, result) {
        if (err) res.json({ error: err })
        else res.status(200).json({ status: "success" })
    })

}
)

app.get('/api/power', (req, res) => {
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    dbConn.query(q, function (err, result) {
        if (err) res.json({ error: err })
        else {
            let power = result[0]["sstatus"] == 1 ? "on" : "off"
            res.status(200).json({ "power": power })
        }
    })

})

app.listen(5000, () => console.log("Server is running"))