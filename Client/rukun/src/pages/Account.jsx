import React,{ useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import AccountCard from '../components/AccountCard'
import VillageCard from '../components/VillageCard'
import { getAdmin } from '../store/actions/users'
import { getData } from '../store/actions/admin'

export default function Account() {
  const data = useSelector(state => state.admin.data)
  const admin = useSelector(state => state.users.admin)
  const dispatch = useDispatch()

  useState(() => {
    dispatch(getAdmin())
    dispatch(getData())
  },[])

  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex flex-nowrap">
          <div className="card card-tumpul sidenav no-border my-2">
            <Sidebar></Sidebar>
          </div>
          <div className="card card-tumpul flex-grow-1 body-section no-border">
            <br/>
            <div className="container-fluid" style={{textAlign: "start", marginTop: 50}}>
            {/* content */}
            <h2>Account</h2> <br/>
            <h5>Account Detail</h5>
              <AccountCard admin={admin}/>

            <br/><h5 style={{marginBottom:20}}>Village Detail</h5>
              <VillageCard village={data}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
