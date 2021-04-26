const route = require('express').Router()
const AdminController = require('../controllers/adminController')
const { authorizeAdmin, authenticate } = require('../middlewares/auth')

route.post('/login', AdminController.loginAdmin)

route.post('/register', AdminController.registerAdmin)

route.use(authenticate, authorizeAdmin)

route.put('/change/:id', AdminController.changeAdmin)

module.exports = route
