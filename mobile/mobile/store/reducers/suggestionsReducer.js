const initialState = {
  suggestions: []
}
  
function suggestionsReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'setSuggestions') {
    return { ...state, suggestions: payload }
  } 
  return state
}
  
export default suggestionsReducer
  