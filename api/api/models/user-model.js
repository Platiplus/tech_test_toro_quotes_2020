// DEPENDENCIES
const mongoose = require('mongoose')
const stockSchema = require('./stock-model')

// DECLARATION OF USER MODEL
const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String, required: true
    },
    password: {
      type: String, required: true
    },
    stocks: {
      type: [stockSchema]
    }
  }
)

// EXPORTING OF MODEL
module.exports = { model: mongoose.model('User', userSchema, 'users'), schema: userSchema }
