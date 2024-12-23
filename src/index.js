const express = require('express')
const Pilot = require('./routers/pilots')

const app = express()
const port = process.env.PORT | 3000

app.use(Pilot)

app.listen(port, () => {
    console.log('Server is on port: ' + port)
})