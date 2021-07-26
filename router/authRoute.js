const express = require("express")
const router = express.Router()
const { dbConn } = require("../connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const maxAge = 3600 * 60 * 24
const createToken = (string) => {
    return jwt.sign({ string }, process.env.SECRET_KEY, { expiresIn: maxAge })
}

router.get("/", (req, res) => {
    const token = req.cookies.farmtoken

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if (err) {
                res.json({ error: err })
            } else {
                res.json({ username: data.string })
            }
        })
    } else {
        res.json({ error: "not_authenticated" })
    }
})

router.post("/login", (req, res) => {
    let { username, password } = req.body
    dbConn.query(
        `SELECT * FROM users WHERE username = "${username}"`,
        (err, result) => {
            if (result.length === 0) {
                res.json({ error: "invalid_username" })
            } else {
                let auth = bcrypt.compareSync(password, result[0].password)
                if (auth) {
                    const token = createToken(username)
                    res.cookie("farmtoken", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    })
                    res.json({ username, message: "success" })
                } else res.json({ error: "wrong_password" })
            }
        }
    )
})

router.post("/signup", (req, res) => {
    let { username, password } = req.body

    dbConn.query(
        `SELECT * FROM users WHERE username = "${username}"`,
        (err, result) => {
            if (result.length > 0) res.json({ error: "existed_username" })
            else {
                let salt = bcrypt.genSaltSync()
                password = bcrypt.hashSync(password, salt)
                dbConn.query(
                    `INSERT INTO users VALUES (101, "${username}", "${password}")`
                )
                const token = createToken(username)
                res.cookie("farmtoken", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                })
                res.json({ username, message: "Success" })
            }
        }
    )
})

router.get("/logout", (req, res) => {
    res.cookie("farmtoken", "", { maxAge: 1 })
    res.json({ message: "logged_out" })
})

module.exports = router
