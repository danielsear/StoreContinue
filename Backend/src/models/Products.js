const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  key: String,
  title: String,
  frete: String,
  spotPrice: String,
  forwardPrice: String,
  namePhoto: String,
  pricePrevious: String,
  productId: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', ProductSchema)
