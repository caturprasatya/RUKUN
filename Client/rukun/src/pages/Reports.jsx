import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ReportCard from '../components/ReportCard'
import '../styles/Table.css'
import ClipLoader from "react-spinners/ClipLoader"
import Moment from 'react-moment';

import { useSelector, useDispatch } from 'react-redux'
import { setTransactionsAsync } from '../store/actions/transactions'
import { getData } from '../store/actions/admin'

export default function Reports() {
  const data = useSelector(state => state.admin.data)
  const transactions = useSelector(state => state.transactions.data)
  const loading = useSelector(state => state.transactions.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTransactionsAsync())
    dispatch(getData())
  }, [dispatch])

  function totalIncome() {
    let income = 0
    if(loading){
      return <ClipLoader></ClipLoader>
    } else {
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

  }

  function totalExpance() {
    let income = 0

    if(loading){
      return <ClipLoader></ClipLoader>
    } else {
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

  }

  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="d-flex flex-nowrap">
            <div className="card card-tumpul sidenav no-border my-2">
              <Sidebar></Sidebar>
            </div>
            <div className="card card-tumpul flex-grow-1 body-section no-border">
              <br/>
              <div className="container-fluid" style={{textAlign: "start", marginTop: 50}}>
                <h3>Reports</h3>
              {/* content */}
              <div className="mb-5 mt-5 mr-5 d-flex justify-content-start align-items-center" >
                <form action="" className="d-flex justify-content-end">
                  <div style={{marginRight: 5, width: 100}}>
                    <label style={{marginRight: 5, width: 55, marginTop: 5}}>Village:</label>
                  </div>
                  <input type="text" value={data?.name} disabled="disabled" style={{marginRight: 25, height: 30}}/>
                  <div style={{marginRight: 5, width: 120}}>
                    <label style={{marginRight: 5, width: 115, marginTop: 5}}> Invitation Code:</label>
                  </div>
                  <input type="text" value={data?.invitation_code} disabled="disabled" style={{marginRight: 10, height: 30}}/>
                </form>
              </div>

              {/* header */}
              <div className="card mr-5">
              <div className="row">
                <div className="col-xl-4 col-sm-12 col-12"> 
                  <div className="card" style={{border:"none"}}>
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex">
                          <div className="align-self-center">
                            <i className="icon-pencil primary font-large-2 float-left"></i>
                          </div>
                          <div className="media-body text-left">
                          {
                            loading ? <ClipLoader></ClipLoader> :
                            <h4>{
                              data?.Transactions?.length === 0 ? 0 : data.Transactions?.length 
                            }</h4>
                          }
                            <span>TRANSACTIONS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-12 col-12">
                  <div className="card" style={{border:"none"}}>
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2 float-left"></i>
                          </div>
                          <div className="media-body text-left">
                            {
                              transactions ?
                              <h4>{ totalIncome() }</h4>
                              : <></>
                            }
                            <span>TOTAL INCOME</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-12 col-12">
                  <div className="card" style={{border:"none"}}>
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex">
                          <div className="align-self-center">
                            <i className="icon-graph success font-large-2 float-left"></i>
                          </div>
                          <div className="media-body text-left">
                            {
                              transactions ?
                              <h4>{ totalExpance() }</h4>
                              : <></>
                            }
                            <span>TOTAL EXPENSE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              {/* header */}

              {/* table */}
              <table className="table">
                <thead className="thead-light  mr-5">
                  <tr>
                    <th scope="col"><Moment format="D MMMM YYYY" withTitle>{new Date()}</Moment></th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Transaction Date</th>
                    <th scope="col" style={{textAlign:"end"}}>Amount</th>
                  </tr>
                </thead>
                <tbody className="mr-5" style={{height: 430}}>
                  {
                    loading ? <ClipLoader></ClipLoader> :
                    transactions?.Transactions?.map((transaction, index) => {
                      return <ReportCard transaction={transaction} key={transaction.id} index={index}></ReportCard>
                    })
                  }
                </tbody>
              </table>
              {/* table */}
              {/* content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
