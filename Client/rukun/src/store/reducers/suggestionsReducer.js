const initialState = {
  data: [],
  dataById: [],
  loading: false,
  error: null
}
  
function suggestionsReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'suggestions/setSuggestions') {
    return { ...state, data: payload }
  } else if (type === 'loading/setLoading') {
    return {...state, loading: payload}
  } else if (type === 'suggestions/setOneSuggestions') {
    return { ...state, dataById: payload }
  }
  return state
}
  
export default suggestionsReducer
  