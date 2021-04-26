if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const route  = require('./routes/')
const handleError = require('./middlewares/errHandler')
const app = express()

app.set('view engine','ejs')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(route)
app.use(handleError)

module.exports = app
