const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("hello")
})
router.post('/', (req, res) => {
    res.send("Post")
})
module.exports = router