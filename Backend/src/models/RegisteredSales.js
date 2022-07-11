
const mongoose = require('mongoose')

const RegisteredSalesSchema = new mongoose.Schema({
  key: String,
  title: Array,
  orderDate: String,
  typePurchase: String,
  cashPayment: String,
  deferredPayment: String,
  namePhoto: String,
  paymentId: String,
  userId: String,
  nameUser: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('RegisteredSales', RegisteredSalesSchema)