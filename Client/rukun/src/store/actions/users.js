import axios from 'axios'

let baseUrl = 'https://rukun-server.herokuapp.com'

export function setUsers(payload) {
  return { type: 'users/setUsers', payload }
}

export function setAdmin(payload) {
  return { type: 'admin/setAdmin', payload }
}

export function setUsersAsync() {
  const url = baseUrl + '/villagers'

  return (dispatch) => {
    axios({
      method: 'GET',
      url,
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(({data}) => {
        dispatch(setUsers(data.Users))
      })
      .catch(err => console.log(err))
  }
}

export function getAdmin() {
  const url = baseUrl + '/user/'

  return (dispatch) => {
    axios({
      method: 'GET',
      url,
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(({data}) => {
        dispatch(setAdmin(data))
      })
      .catch(err => console.log(err))
  }
}