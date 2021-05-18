const express = require('express')
const feedList = require('./feedList')
require('dotenv').config()

let {dbConn} = require('./connection')
let settingRouter = require('./router/settingRouter')
let modeRouter = require('./router/modeRouter')
let powerRouter = require('./router/powerRouter')



const app = express()
app.use(express.json())


app.use('/api/setting', settingRouter)

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



app.use('/', modeRouter)

app.use('/', powerRouter)

app.listen(5000, () => console.log("Server is running"))
