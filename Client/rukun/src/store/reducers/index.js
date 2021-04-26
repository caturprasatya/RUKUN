import { combineReducers } from 'redux'
import users from './usersReducer'
import transactions from './transactionsReducer'
import suggestions from './suggestionsReducer'
import admin from './adminReducer'
import village from './villagerReducer'

const reducer = combineReducers({
  users,
  transactions,
  suggestions,
  admin,
  village
})

export default reducer
