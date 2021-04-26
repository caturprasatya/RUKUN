import React,{ useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../store/actions/admin'
import { getAdmin } from '../store/actions/users'
import { setTransactionsAsync } from '../store/actions/transactions'
import ClipLoader from "react-spinners/ClipLoader"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Home() {
  const data = useSelector(state => state.admin.data)
  const loading = useSelector(state => state.admin.loading)
  const transactions = useSelector(state => state.transactions.data)
  const login = useSelector(state => state.admin.login)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(setTransactionsAsync())
    dispatch(getData())
    dispatch(getAdmin())
  },[dispatch])

  function totalIncome() {
    let income = 0

    transactions?.Transactions?.forEach(transaction => {
      if (transaction.type === "income") {
        income = income + +transaction.amount
      }
    })

    var rupiah = '';		
    var angkarev = income.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

  function totalExpance() {
    let income = 0

    transactions?.Transactions?.forEach(transaction => {
      if (transaction.type === "expance") {
        income = income + +transaction.amount
      }
    })

    var rupiah = '';		
    var angkarev = income.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

  function toIDR (value) {
    return `Rp. ${value?.toLocaleString()}`
  }

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
            <h3>Dashboard</h3>
            <div className="mb-5 mt-5 mr-5 d-flex justify-content-start align-items-center" >
              <div className="d-flex justify-content-end">
                <div style={{marginRight: 5, width: 100}}>
                  <label style={{marginRight: 5, width: 55, marginTop: 5}}>Village:</label>
                </div>
                <input type="text" value={data?.name} disabled="disabled" style={{marginRight: 25, height: 30}}/>
                <div style={{marginRight: 5, width: 120}}>
                  <label style={{marginRight: 5, width: 115, marginTop: 5}}> Invitation Code:</label>
                </div>
                <input type="text" value={data?.invitation_code} disabled="disabled" style={{marginRight: 10, height: 30}}/>
              </div>
            </div>
              
            {/* summary */}
            <h5>SUMMARY</h5><br/>
            <div className="row mr-5 mb-4">
              {/* income */}
              <div className="col-xl-6 col-md-12 mb-2">
                <div className="card overflow-hidden">
                  <div className="card-content">
                    <div className="card-body cleartfix" style={{padding: 5}}>
                      <div className="media align-items-stretch">
                        <div className="align-self-center">
                          <i className="icon-pencil primary font-large-2 mr-2"></i>
                        </div>
                        <div className="media-body mt-3 mb-2">
                          <h6>TOTAL INCOME</h6>
                          {
                            transactions ?
                            <h4>{ totalIncome() }</h4>
                            : <></>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* income */}

              {/* expense */}
              <div className="col-xl-6 col-md-12 mb-2">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body cleartfix" style={{padding: 5}}>
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2 mr-2"></i>
                          </div>
                        <div className="media-body mt-3 mb-2">
                          <h6>TOTAL EXPENSE</h6>
                          {
                            transactions ?
                            <h4>{ totalExpance() }</h4>
                            : <></>
                          }
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* expense */}

          {/* transaction */}
            <div className="row mr-5 mb-4">
              {/* income */}
              <div className="col-xl-6 col-md-12 mb-2">
                <div className="card overflow-hidden">
                  <div className="card-content">
                    <div className="card-body cleartfix" style={{padding: 5}}>
                      <div className="media align-items-stretch">
                        <div className="align-self-center">
                          <i className="icon-pencil primary font-large-2 mr-2"></i>
                        </div>
                        <div className="media-body mt-3 mb-2">
                          <h6>CURRENT BALANCE</h6>
                          { 
                            loading ? <ClipLoader></ClipLoader> :
                            (<h4>{toIDR(data?.balance)}</h4>)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* income */}

              {/* expense */}
              <div className="col-xl-6 col-md-12 mb-2">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body cleartfix" style={{padding: 5}}>
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2 mr-2"></i>
                          </div>
                          <div className="media-body mt-3 mb-2" onClick={() => history.push('/reports')}>
                          <h6>TRANSACTIONS</h6>
                          {
                            loading ? <ClipLoader></ClipLoader> :
                            <h4>{
                              data.Transactions?.length === 0 ? 0 : data.Transactions?.length 
                            }</h4>
                          }
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* transaction */}
              <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
