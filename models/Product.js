const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sizing: {
    type: String,
    required: true
  },
  pricing: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Products', ProductSchema)