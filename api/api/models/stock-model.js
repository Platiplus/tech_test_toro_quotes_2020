// DEPENDENCIES
const mongoose = require('mongoose')

// DECLARATION OF STOCK MODEL
const stockSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String, required: true
    },
    quantity: {
      type: Number, required: true
    }
  }
)

// EXPORTING OF MODEL
module.exports = { model: mongoose.model('Stock', stockSchema, 'stock'), schema: stockSchema }
