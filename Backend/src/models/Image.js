const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

ImageSchema.pre('save', function () {
  if (!this.url) {
    this.url = `http://localhost:3333/files/${this.key}`
  }
})

ImageSchema.pre('remove', function () {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
  )
})

module.exports = mongoose.model('Image', ImageSchema)
