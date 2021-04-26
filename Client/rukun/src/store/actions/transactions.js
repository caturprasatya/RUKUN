import axios from 'axios'
const url = 'https://rukun-server.herokuapp.com/transactions'

export function setTransactions(payload) {
  return { type: 'transactions/setTransactions', payload }
}

export function setLoading (payload) {
  return {type : 'loading/setLoading', payload}
}
  
export function setTransactionsAsync() {
  
  return (dispatch) => {
    axios({
      method: 'GET',
      url,
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(({data}) => {
        // console.log(data,'data');
        dispatch(setTransactions(data))
      })
      .catch(err => console.log(err))
  }
}

export function addTransactionsAsync(payload) {
  console.log(payload, 'payload');
  
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'POST',
      url,
      headers: {
        access_token: localStorage.access_token
      },
      data: payload
    })
      .then(({data}) => {
        dispatch(setTransactions(data.Transactions))
      })
      .catch(err => console.log(err))
      .finally(_ => {
        dispatch(setLoading(false))
      })
  }
}