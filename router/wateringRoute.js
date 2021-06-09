const express = require('express')
const { getSystemMode } = require('../systemMode')
const router = express.Router()

router.get('/', async (req, res) => {
    res.json({mode: getSystemMode()})
})

module.exports = router