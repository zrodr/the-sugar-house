const mongoose = require('mongoose')

const URI = process.env.MONGO_URI

mongoose.set('useFindAndModify', false)

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('connected to db...')
})

module.exports = db