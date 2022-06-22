const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const Image = require('./models/Image')
const User = require('./models/User')
const Product = require('./models/Products')

//IMAGESs

routes.get('/images', async (req, res) => {
  const image = await Image.find()
  return res.json(image)
})

routes.post('/image', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key } = req.file
  
  const image = await Image.create({
    name,
    size,
    key,
    url: ''
  })
  return res.json(image)
})

routes.get('/image/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  return res.json(user)
})



//USERS

routes.post('/user', async (req, res) => {
  const { name, key, email, password, admin, userId, file } = req.body
  const user = await User.create({ name, key, email, password, admin, userId,file })
  return res.json(user)
})

routes.get('/users', async (req, res) => {
  const users = await User.find()
  return res.json(users)
})

routes.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  return res.json(user)
})

routes.post('/delete-user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  await user.remove()

  return res.json({ message: 'Usuario deletado com sucesso.' })
})

//PRODUCTS

routes.get('/products', async (req, res) => {
  const products = await Product.find()
  return res.json(products)
})

routes.post('/product', async (req, res) => {
  const { title, spotPrice, forwardPrice, Idphoto } = req.body

  const product = await Product.create({
    title,
    spotPrice,
    forwardPrice,
    Idphoto
  })
  return res.json(product)
})

routes.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)

  return res.json(product)
})

routes.post('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)

  await product.remove()

  return res.json('Produto deletado com sucesso.')
})

module.exports = routes
