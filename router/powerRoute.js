const express = require("express")
const router = express.Router()
const feedList = require("../feedList")
const { dbConn } = require("../connection")
const publisher = require("../publisher")

router.post("/", (req, res) => {
    let relayFeed = feedList.find((feed) => feed.name == "relay").link
    let ledFeed = feedList.find((feed) => feed.name == "led").link
    let query = `SELECT sstatus FROM mainsystem WHERE id = 101`
    dbConn.query(query, function (err, result) {
        if (err) res.json({ error: err })

        let newStatus = result[0]["sstatus"] === 0 ? 1 : 0
        let p = `UPDATE mainsystem SET sstatus = ${newStatus} WHERE id = 101`

        dbConn.query(p, function (err, _) {
            if (err) res.json({ error: err })

            publisher("relay", newStatus)
            publisher("led", newStatus === 1 ? "2" : "1")
            res.status(200).json({ power: newStatus === 1 ? "on" : "off" })
        })
    })
})

router.get("/", (req, res) => {
    let query = `SELECT sstatus FROM mainsystem WHERE id = 101`
    dbConn.query(query, (err, result) => {
        if (err) res.json({ error: err })
        let power = result[0]["sstatus"] === 1 ? "on" : "off"
        res.status(200).json({ power })
    })
})

module.exports = router
