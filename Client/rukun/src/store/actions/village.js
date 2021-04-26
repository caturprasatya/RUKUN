import axios from 'axios'

const baseUrl = 'https://rukun-server.herokuapp.com'

export function setData(payload) {
  return { type: 'village/setData', payload }
}

export function setLoading (payload) {
  return {type : 'loading/setLoading', payload}
}

export function setVillageAsync(payload) {
  const url = baseUrl + '/village'

  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'PATCH',
      url,
      headers: {
        access_token: localStorage.access_token
      },
      data: payload
    })
    .then(({data}) => {
      console.log(data);
      dispatch(getVillagers())
    })
    .catch(err => console.log(err))
    .finally(_ => {
      dispatch(setLoading(false))
    })
  }
}


export function getVillagers() {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      url: baseUrl + "/villagers",
      method: "GET",
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({data}) => {
      // console.log(data,' fetch');
      dispatch(setData(data))
    })
    .catch(err => {
      console.log(err);
    })
    .finally(_ => {
      dispatch(setLoading(false))
    })
  }
}

export function deleteVillagers(data) {
  console.log(data, 'acinot');
  const id = data
  return (dispatch) => {
    axios({
      url: baseUrl + `/user/${id}`,
      method: "DELETE",
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({data}) => {
      dispatch(getVillagers())
      // console.log(data);
    })
    .catch(err => {
      console.log(err);
    })

  }
}




