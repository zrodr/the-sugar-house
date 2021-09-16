const mongoose = require('mongoose')

const connectToDB = () => {
  let connected = false // ensures we only connect to db once
  
  return function(req, res, next) { // return middleware for elegant error handling
    if (!connected) {
      connected = true
      const URI = process.env.MONGO_LOCAL
      //const URI = process.env.MONGO_URI_ATLAS
  
      mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
        .catch((err) => {
          const error = new Error('Internal server error! Please try again later.')
          next(error)
        })
  
      const db = mongoose.connection
  
      db.once('open', () => {
        console.log('Connected to db...')
      })
    }
    next()
  }
}

module.exports = connectToDB