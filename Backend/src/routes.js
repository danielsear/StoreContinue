const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const Image = require('./models/Image')
const User = require('./models/User')
const Product = require('./models/Products')
const CustomerOrders= require('./models/CustomerOrders')
const RegisteredSales= require('./models/RegisteredSales')




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

routes.get('/delete-image/:name', async (req, res) => {
  const img = await Image.findOne({ name:req.params.name})
 
  await img.remove()

  return res.json('Imagem deletada com sucesso.')
})

//USERS

routes.post('/user', async (req, res) => {
  const { name, key, email, password, admin, userId, file,likeProducts} = req.body
  const user = await User.create({ name, key, email, password, admin, userId,file,likeProducts })
  return res.json(user)
})

routes.post('/user-update', async (req, res) => {
  const { userId, name, email, password, admin, file, likeProducts} = req.body

  if(req.body){

  const user = await User.updateOne({userId},{
     userId,
      name, 
      email,
       password,
        admin, 
        file, 
        likeProducts
  })
  return res.json({
    error: false,
    message: 'Usuário editado com sucesso.'
  })
}
return res.status(400).json({
  error: true,
  message: 'Error: Usuário não criado com sucesso.'
})

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

routes.post('/product-create', async (req, res) => {
  const { title, spotPrice, forwardPrice, productId, namePhoto,pricePrevious,frete,group } = req.body

  if(req.body){

  const product = await Product.create({
    title,
    spotPrice,
    frete,
    forwardPrice,
    namePhoto,
    pricePrevious,
    productId,
    group
  })
  return res.json({
    error: false,
    message: 'Produto criado com sucesso.'
  })
}
return res.status(400).json({
  error: true,
  message: 'Error: Produto não criado com sucesso.'
})

})

routes.post('/product-update', async (req, res) => {
  const { title, spotPrice, forwardPrice, productId, namePhoto,pricePrevious,frete,group } = req.body

  if(req.body){

  const product = await Product.updateOne({productId},{
    title,
    spotPrice,
    frete,
    forwardPrice,
    namePhoto,
    pricePrevious,
    productId,
    group
  })
  return res.json({
    error: false,
    message: 'Produto editado com sucesso.'
  })
}
return res.status(400).json({
  error: true,
  message: 'Error: Produto não criado com sucesso.'
})

})

routes.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)

  return res.json(product)
})

routes.get('/delete-product/:id', async (req, res) => {
  const product = await Product.findOne({productId: req.params.id})
 
  await product.remove()
  .then(()=>{
    return res.json({
      error: false,
      message: 'Produto deletado com sucesso.'
    })
  }).catch(err => {
    return res.json({
      error: true,
      message: err
    })
  })

})

//CustomerOrders

routes.get('/customerOrders-list', async (req,res) =>{
  const customerOrders = await CustomerOrders.find()
  return res.json(customerOrders)
})

routes.post('/customerOrders-create', async (req, res) =>{
  const {nameProducts, userId, proofOfPaymentPhoto, formOfPayment, paymentId, spotPrice ,forwardPrice} = req.body

  if(req.body){
    CustomerOrders.create({
      nameProducts, 
      userId,
      proofOfPaymentPhoto,
      formOfPayment, 
      paymentId,
      spotPrice,
      forwardPrice,
    })
  }

  res.json({
    error: false,
    message: 'Pagamento cadastrado com sucesso.'
  })

})

routes.get('/customerOrders-delete/:id', async (req, res) => {
  const customerOrder = await CustomerOrders.findOne({paymentId: req.params.id})
 console.log(customerOrder);
  await customerOrder.remove()
  .then(()=>{
    return res.json({
      error: false,
      message: 'Pedido cancelado com sucesso.'
    })
  }).catch(err => {
    return res.json({
      error: true,
      message: err
    })
  })

 
})

//RegisteredSales

routes.get('/registeredSales-list', async (req,res) =>{
  const registeredSales = await RegisteredSales.find()
  return res.json(registeredSales)
})

routes.post('/registeredSales-create', async (req, res) =>{
  const {
    title,
    typePurchase,
    cashPayment,
    deferredPayment,
    orderDate,
    namePhoto,
    paymentId,
    nameUser,
    userId,
    } = req.body

  if(req.body){
    RegisteredSales.create({
        title,
      typePurchase,
      cashPayment,
      deferredPayment,
      orderDate,
      namePhoto,
      paymentId,
      nameUser,
      userId,
    })
  }

  res.json({
    error: false,
    message: 'Venda cadastrada com sucesso.'
  })

})

routes.get('/registeredSales-delete/:id', async (req, res) => {
  const registeredSales = await RegisteredSales.findOne({paymentId: req.params.id})
 
  await registeredSales.remove()
  .then(()=>{
    return res.json({
      error: false,
      message: 'Venda deletada com sucesso.'
    })
  }).catch(err => {
    return res.json({
      error: true,
      message: err
    })
  })

 
})


module.exports = routes
