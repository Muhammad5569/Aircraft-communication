const express = require('express')
const mongoose = require('mongoose')
const routerPilot = require('./routers/pilots')
const routerFlight = require('./routers/flight')
const routerAircraft = require('./routers/aircraft')
const routerSystemAdmin = require('./routers/system-admin')
require('dotenv').config()

const app = express()
const port = process.env.PORT | 3000
mongoose.connect('mongodb://localhost:27017/aircraft')

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(express.json()) 
app.use(routerPilot)
app.use(routerFlight)
app.use(routerAircraft)
app.use(routerSystemAdmin)

app.listen(port, () => {
    console.log('Server is on port: ' + port)
})