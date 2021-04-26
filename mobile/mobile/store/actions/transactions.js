const url = 'http://192.168.100.104:3000/'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export function setTransactions(payload) {
  return { type: 'setTransactions', payload }
}
  
export function setTransactionsAsync() {
  return async (dispatch) => {
    dispatch({type: "isLoadingTransaction", payload:true })
    dispatch({type: "isErrorTransaction", payload:null })
    const token = await AsyncStorage.getItem('token')
    console.log(token);
    axios.get(url + 'transactions', {
      headers: { access_token: token }
    })
    .then(res => {
      console.log(res.data,"ini data");
      const dataDesa = {
        balance: res.data.balance,
        name : res.data.name,
        location: res.data.location

      }
      dispatch({type: "setDesa", payload:dataDesa })
      dispatch(setTransactions(res.data.Transactions))
      dispatch({type: "isLoadingTransaction", payload:false })
    })
    .catch(error => {
        console.log(error.response)
        dispatch({type: "isErrorTransaction", payload:error.response })
        dispatch({type: "isLoadingTransaction", payload:false })
    })
  }
}

export function setMyTransactionsAsync() {
  return async (dispatch) => {
    dispatch({type: "isLoadingTransaction", payload:true })
    dispatch({type: "isErrorTransaction", payload:null })
    const token = await AsyncStorage.getItem('token')

    axios.get(url + 'transactions/user', {
      headers: { access_token: token }
    })
    .then(res => {
      console.log(res.data,"ini data my transaction");
      dispatch({type:"setMyTransactions", payload:res.data})
      dispatch({type: "isLoadingTransaction", payload:false })
    })
    .catch(error => {
        console.log(error.response)
        dispatch({type: "isErrorTransaction", payload:error.response })
        dispatch({type: "isLoadingTransaction", payload:false })
    })
  }
}