const initialState = {
  transactions: [],
  myTransactions: [],
  loading: false,
  error : null,
}
  
function transactionsReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'setTransactions') {
    return { ...state, transactions: payload }
  } else if (type === 'setMyTransactions') {
    return { ...state, myTransactions: payload }
  } else if (type === 'isLoadingTransaction') {
    return { ...state, loading: payload }
  } else if (type === 'isErrorTransaction') {
    return { ...state, error: payload }
  } 
  return state
}
  
export default transactionsReducer
  