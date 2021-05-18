const express = require('express')
const cookieParser = require('cookie-parser')
const feedList = require('./feedList')
require('dotenv').config()

let {dbConn} = require('./connection')
let {requireAuth} = require('./middlewares/authMiddleware')
let settingRoute = require('./router/settingRoute')
let modeRoute = require('./router/modeRoute')
let powerRoute = require('./router/powerRoute')
let authRoute = require('./router/authRoute')
let humidRoute = require('./router/humidRoute')

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoute)
app.use('/api/setting',requireAuth, settingRoute)
app.use('/api/mode', requireAuth, modeRoute)
app.use('/api/power', requireAuth, powerRoute)
app.use('/api/humid', requireAuth, humidRoute)

app.listen(5000, () => console.log("Server is running"))
