const route = require('express').Router()
const SuggestionConroller = require('../controllers/suggestionController')
const { authorize } = require('../middlewares/auth')


route.get('/', SuggestionConroller.fetchSuggestions)

route.post('/', SuggestionConroller.addSuggestion)

route.use('/:id', authorize)

route.delete('/:id', SuggestionConroller.deleteSuggestion)

module.exports = route
