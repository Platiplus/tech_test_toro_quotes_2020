// DEPENDENCIES
const mongoose = require('mongoose')

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
    balance: {
      type: Number, required: true
    },
    stocks: {
      type: Array
    }
  }
)

// EXPORTING OF MODEL
module.exports = mongoose.model('User', userSchema, 'users')
