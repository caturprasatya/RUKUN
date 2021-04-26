import React,{ useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../store/actions/admin'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Sidebar() {
  const isLogin = useSelector(state => state.admin.login)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(isLogin,'status');
    if(!localStorage.access_token) {
      history.push('/')
    }
  }, [])

  function toDashboard() {
    history.push("/dashboard")
  }
  function toReports() {
    history.push("/reports")
  }
  function toTransactions() {
    history.push("/transactions")
  }
  function toSuggestions() {
    history.push("/suggestions")
  }
  function toVillagers() {
    history.push("/villagers")
  }
  function toAccount() {
    history.push("/account")
  }
  function toAnnouncements() {
    history.push("/announcements")
  }

  function logout() {
    dispatch(adminLogout())
    history.push("/")
  }
  
  return (
    <div className="card-body px-0 d-flex flex-column">
      <div className="d-flex flex-column align-items-center justify-content-center mb-4">
          <img src="../../rukun-logo.png" alt="Rukun Logo" className="m-0" style={{height:150}}/>
      </div>
      <div className="flex-grow-1 menu">
          <div className="d-flex align-items-center" onClick={toDashboard}>
              <i className="fa fa-home" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Dashboard</h6>
          </div>
          <div className="d-flex align-items-center" onClick={toReports}>
              <i className="fa fa-home" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Reports</h6>
          </div>
          <div className="d-flex align-items-center" onClick={toAnnouncements}>
              <i className="fa fa-boxes" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Announcements</h6>
          </div>
          <div className="d-flex align-items-center" onClick={toTransactions}>
              <i className="fa fa-shopping-basket" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Transactions</h6>
          </div>
          <div className="d-flex align-items-center" onClick={toSuggestions}>
              <i className="fa fa-boxes" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Information</h6>
          </div>
          <div className="d-flex align-items-center" onClick={toVillagers}>
              <i className="fa fa-boxes" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Villagers</h6>
          </div>
          <div className="d-flex align-items-center" onClick={toAccount}>
              <i className="fa fa-boxes" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}}>Account</h6>
          </div>
      </div>
      <div className="menu">
          <div className="d-flex align-items-center" onClick={logout}>
              <i className="fa fa-power-off" style={{fontSize:"3rem", color:"#1abc9c"}}></i>
              <h6 className="m-0 font" style={{color: "white"}} onClick={(event) => logout(event)}>Logout</h6>
          </div>
      </div>
    </div>
  )
}
