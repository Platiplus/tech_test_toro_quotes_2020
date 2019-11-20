// DEPENDENCIES
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const fileSystem = require('fs')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const app = express()
const Database = require('./utils/Database')

const accessLogStream = fileSystem.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

// CONTROLLERS
const authRoutes = require('./api/routes/auth-routes')

// MIDDLEWARES
app.use(helmet())
app.use(logger('combined', { stream: accessLogStream }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// DB CONNECTION
const db = new Database()
db.connect()

// ROUTES
app.use('/auth', authRoutes)

// ERROR 404 HANDLING
app.use((request, response, next) => {
  return response.status(404).json({ error: true, message: 'Route not found' })
})

// APP EXPORTING
module.exports = app
