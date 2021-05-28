const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.farmtoken

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if (err) {
                res.redirect('/')
            }
            else {
                next()
            }
        })
    }
    else {
        res.redirect('/')
    }
}