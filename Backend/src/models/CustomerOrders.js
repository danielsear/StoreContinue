
const mongoose = require('mongoose')

const CustomerOrdersSchema = new mongoose.Schema({
  key: String,
  nameProducts: Array,
  userId: String,
  proofOfPaymentPhoto: String,
  formOfPayment: String,
  paymentId: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('CustomerOrders', CustomerOrdersSchema)
