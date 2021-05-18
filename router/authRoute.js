const express = require('express')
const router = express.Router()
const {dbConn} = require('../connection')

router.post('/login', (req, res) => {

})

router.post('/signup', (req, res) => {
    let {username, password} = req.body

})

router.get('/logout', (req, res) => {

})