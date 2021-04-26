import React,{ useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "../styles/Register.css"
import { adminRegister } from '../store/actions/admin'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Register() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [villageName, setVillageName] = useState('')
  const [location, setLocation] = useState('')
  const [balance, setBalance] = useState('')
  const dispatch = useDispatch()

  function addName(event) {
    setName(event.target.value)
  }
  function addUsername(event) {
    setUsername(event.target.value)
  }
  function addPassword(event) {
    setPassword(event.target.value)
  }
  function addVillageName(event) {
    setVillageName(event.target.value)
  }
  function addLocation(event) {
    setLocation(event.target.value)
  }
  function addBalance(event) {
    setBalance(event.target.value)
  }

  function register(event) {
    event.preventDefault()
    const data = {
      name, username, password, nameVillage: villageName, location, balance
    }
    dispatch(adminRegister(data))
    toast.info(`${villageName} created`, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    })
    history.push('/')
  }

  useEffect(() => {
    if(localStorage.access_token) {
      history.push('/dashboard')
    }
  }, [])

  function login() {
    history.push('/')
  }
  
  return (
    <div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6 border-line mt-4" >
              <div className="card2 card border-0 px-4 py-5 mt-1" style={{padding: 0}}>
              <form onSubmit={(event) => register(event)}>
                <div className="row px-3"> 
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Name</h6>
                  </label> 
                  <input className="mb-2" type="text" placeholder="Your Name" onChange={addName} required/> 
                </div>
                <div className="row px-3"> 
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Username</h6>
                  </label> 
                  <input className="mb-2" type="text" placeholder="Username" onChange={addUsername} required/> 
                </div>
                <div className="row px-3"> 
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Password</h6>
                  </label> 
                  <input type="password" className="mb-2" placeholder="Enter password" required onChange={addPassword}/> 
                </div>
                <div className="row px-3"> 
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Village Name</h6>
                  </label> 
                  <input className="mb-2" type="text" placeholder="Village Name" required onChange={addVillageName}/> 
                </div>
                <div className="row px-3"> 
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Location</h6>
                  </label> 
                  <input className="mb-2" type="text" placeholder="Location" required onChange={addLocation}/> 
                </div>
                <div className="row px-3"> 
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Balance</h6>
                  </label> 
                  <input className="mb-2" type="number" placeholder="Balance" required onChange={addBalance}/> 
                </div>
                <div className="row mb-3 px-3 mt-4"> 
                  <button type="submit" className="btn btn-blue text-center">Register</button> 
                </div>
                <div className="row mb-3 px-3"> 
                  <small className="font-weight-bold">Already have an account? <a className="text-danger" onClick={login}>Login</a></small> 
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card1 pb-5">
              <div className="row d-flex justify-content-end" style={{width: 580}}>  
                <img src="../../rukun-logo-long-blue.png" style={{width: 175, marginTop:60, marginLeft:70}} placeholder="logo rukun"/> 
              </div>
              <div className="row justify-content-center mt-4 mb-5" style={{padding: 0, width: 580}}>   
                <img src="../../rukun-register.png" style={{width: 500, marginTop:20, marginBottom:100, marginLeft:50}} /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
