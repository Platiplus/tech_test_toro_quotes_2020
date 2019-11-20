// DEPENDENCIES
const mongoose = require('mongoose')

// DATABASE CONNECTION FACTORY
class Database {
  connect () {
    const uri = process.env.MONGO_URI

    return mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
  }
}

module.exports = Database
