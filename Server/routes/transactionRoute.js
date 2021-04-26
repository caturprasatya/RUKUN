const route = require('express').Router()
const TransactionController = require('../controllers/transactionController') 

route.get('/', TransactionController.fetchTransactions)

route.post('/', TransactionController.addTransaction)

route.get('/user', TransactionController.fetchTransactionsUser)

module.exports = route
