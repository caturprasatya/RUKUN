const initialState = {
    data: [],
    admin: []
  }
  
  function usersReducer(state = initialState, action) {
    const { type, payload } = action
    if(type === 'users/setUsers') {
        return { ...state, data: payload }
    } else if(type === 'admin/setAdmin') {
      return { ...state, admin: payload }
    } 
    return state
  }
  
  export default usersReducer
  