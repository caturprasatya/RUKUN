import axios from 'axios'

const baseUrl = 'https://rukun-server.herokuapp.com'

export function setSuggestions(payload) {
  return { type: 'suggestions/setSuggestions', payload }
}

export function setOneSuggestions(payload) {
  console.log(payload);
  return { type: 'suggestions/setOneSuggestions', payload }
}

export function setLoading (payload) {
  return {type : 'loading/setLoading', payload}
}
  
export function setSuggestionsAsync() {
  const url = baseUrl + '/suggestions'
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'GET',
      url,
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({data}) => {
      console.log(data);
      dispatch(setSuggestions(data))
    })
    .catch(err => console.log(err))
    .finally(_ => {
      dispatch(setLoading(false))
    })
  }
}

export function newSuggestion (data) {
  return(dispatch) => {
    dispatch(setLoading(true))
    axios({
    url: baseUrl + '/suggestions',
    method: 'POST',
    headers: {
      access_token: localStorage.access_token
    },
    data
  })
    .then(({data}) => {
      dispatch(setSuggestionsAsync())
    })
    .catch(err => console.log(err))
    .finally(_ => {
      dispatch(setLoading(false))
    })
  }
}

export function getOneSuggestion(data) {
  const id = data.id
  return (dispatch) => {
    axios({
      url: baseUrl + `/suggestions/${id}`,
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({data}) => {
      dispatch(setOneSuggestions(data))
    })
    .catch(err => console.log(err))
  }
}


export function deleteSuggestion(data) {
  return (dispatch) => {
    axios({
      url: baseUrl + `/suggestions/${data}`,
      method: 'DELETE',
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(data => {
      dispatch(setSuggestionsAsync())
    })
    .catch(err => console.log(err))
  }
}