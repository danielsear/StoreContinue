const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userId: String,
  name: String,
  key: String,
  email: String,
  password: String,
  admin: Boolean,
  file: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
