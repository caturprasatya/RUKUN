const route = require('express').Router()
const VillageController = require('../controllers/villageController')
const { authorizeAdmin } = require('../middlewares/auth')

route.use( authorizeAdmin )

route.get('/', VillageController.getDataVillage)

module.exports = route
