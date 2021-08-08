const mongoose = require('mongoose')

const connectToDB = () => {
  try {
    /* const URI = process.env.MONGO_LOCAL */ 
    const URI = process.env.MONGO_URI_ATLAS

    mongoose.connect(URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false 
    })

    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
      console.log('connected to db...')
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = connectToDB