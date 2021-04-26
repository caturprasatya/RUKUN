const initialState = {
  data: [],
  loading: false
}
  
function transactionsReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'transactions/setTransactions') {
    return { ...state, data: payload }
  } else if (type === 'loading/setLoading') {
    return {...state, loading: payload}
  }
  return state
}
  
export default transactionsReducer
  