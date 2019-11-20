// DEPENDENCIES
const mongoose = require('mongoose')

// DECLARATION OF ACCOUNT MODEL
const accountSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    owner: {
      type: mongoose.Schema.Types.ObjectId, required: true
    },
    balance: {
      type: Number, required: true
    }
  }
)

// EXPORTING OF MODEL
module.exports = { model: mongoose.model('Account', accountSchema, 'accounts'), schema: accountSchema }
