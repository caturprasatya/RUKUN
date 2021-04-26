import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import suggestionsReducer from './suggestionsReducer'
import desaReducer from './desaReducer'

const reducer = combineReducers({
  transactionsReducer,
  suggestionsReducer,
  desaReducer,
})

export default reducer
