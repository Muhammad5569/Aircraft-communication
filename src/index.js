const express = require('express')
const routerPilot = require('./routers/pilots')
require('dotenv').config()

const app = express()
const port = process.env.PORT | 3000

app.use(express.json()) 
app.use(routerPilot)

app.listen(port, () => {
    console.log('Server is on port: ' + port)
})