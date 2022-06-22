require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

app.use(cors())


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)

app.use(require('./routes'))

const uri = process.env.MONGOOSE_URL_CONECTION2

mongoose
  .connect(uri, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(' Conecting mongoose ')
  })
  .catch(err => console.error(err))

app.listen(3333, () => {
  console.log(' Server online!')
})
