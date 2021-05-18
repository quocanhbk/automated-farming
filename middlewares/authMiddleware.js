const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.farmtoken

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if (err) {
                res.send("Not authorized")
            }
            else {
                next()
            }
        })
    }
    else {
        res.send("Not authorized")
    }
}