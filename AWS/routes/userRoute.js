const route = require('express').Router()
const UserController = require('../controllers/userController')
const { authorizeAdmin, authenticate } = require('../middlewares/auth')

route.post('/login', UserController.login)

route.post('/register', UserController.register)

route.use( authenticate )

route.get('/', UserController.getUser)

route.use( authorizeAdmin )

route.delete('/:id', UserController.deleteUser)

module.exports = route
