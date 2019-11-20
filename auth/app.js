// DEPENDENCIES
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()

// CONTROLLERS
const authRoutes = require('./api/routes/auth-routes')

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.use('/auth', authRoutes)

// ERROR 404 HANDLING
app.use((request, response, next) => {
  return response.status(404).json({ error: true, message: 'Route not found' })
})

// APP EXPORTING
module.exports = app
