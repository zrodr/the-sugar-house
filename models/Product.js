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
    type: [Number],
    required: true
  },
  pricing: {
    type: [Number],
    required: true
  }
})

module.exports = mongoose.model('Products', ProductSchema)