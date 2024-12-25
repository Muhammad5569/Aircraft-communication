const express = require('express')
const mongoose = require('mongoose')
const routerPilot = require('./routers/pilots')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
require('dotenv').config()

const app = express()
const port = process.env.PORT | 3000
mongoose.connect('mongodb://localhost:27017/aircraft')
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Aircraft API',
            version: '1.0.0',
            description: 'Aircraft Communication API Documentation'
        },
        servers: [
            {
                url: `http://localhost:${port}/api-doc`
            }
        ]
    },
    apis: ['./src/routers/*.js']
}

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json()) 
app.use(routerPilot)

app.listen(port, () => {
    console.log('Server is on port: ' + port)
})