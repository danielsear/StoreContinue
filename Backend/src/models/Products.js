const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  key: String,
  title: String,
  spotPrice: String,
  forwardPrice: String,
  Idphoto: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', ProductSchema)
