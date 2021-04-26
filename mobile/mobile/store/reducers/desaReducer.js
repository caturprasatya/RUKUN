const initialState = {
  desa: {}
}
  
function desaReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'setDesa') {
    return { ...state, desa: payload }
  } 
  return state
}
  
export default desaReducer