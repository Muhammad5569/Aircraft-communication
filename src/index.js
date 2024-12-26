const express = require('express')
const mongoose = require('mongoose')
const routerPilot = require('./routers/pilots')
require('dotenv').config()

const app = express()
const port = process.env.PORT | 3000
mongoose.connect('mongodb://localhost:27017/aircraft')


app.use(express.json()) 
app.use(routerPilot)

app.listen(port, () => {
    console.log('Server is on port: ' + port)
})