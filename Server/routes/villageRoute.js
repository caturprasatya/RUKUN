const route = require('express').Router()
const VillageController = require('../controllers/villageController')
const { authorizeAdmin } = require('../middlewares/auth')

route.use( authorizeAdmin )

route.patch('/', VillageController.updateVillage)


module.exports = route
