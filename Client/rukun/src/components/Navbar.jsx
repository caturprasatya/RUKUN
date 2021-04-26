import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Navbar() {
  const history = useHistory()

  function toLogin() {
    history.push('/')
  }

  function toRegister() {
    history.push('/register')
  }
  
  return (

    <nav className="navbar" style={{paddingTop: 0, paddingBottom: 0, backgroundColor: "#e9ecef"}}>

      <h1 className="navbar-brand">Logo Rukun</h1>
      <div>
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><a href="" onClick={toLogin}>Sign In</a></li>
        <li className="breadcrumb-item"><a href="" onClick={toRegister}>Sign Up</a></li>
      </ol>
      </div>
    </nav>
  )
}
