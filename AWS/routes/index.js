const midtransRoute = require('./midtransRoute')
const route = require('express').Router()
const userRoute = require('./userRoute')
const adminRoute = require('./adminRoute')
const villageRoute = require('./villageRoute')
const villagersRoute = require('./villagersRoute')
const transactionRoute = require('./transactionRoute')
const suggestionRoute = require('./suggestioRoute')
const { authenticate } = require('../middlewares/auth')


route.get('/' ,(req, res)=>{
  res.send('gooooo')
})

route.use('/user', userRoute)

route.use('/admin', adminRoute)

route.use(authenticate)

route.use('/midtrans', midtransRoute)

route.use('/village', villageRoute)

route.use('/villagers', villagersRoute)

route.use('/transactions', transactionRoute)

route.use('/suggestions', suggestionRoute)

module.exports = route
