import React from 'react'
import Sidebar from '../components/Sidebar'

export default function EditAccount() {
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
            <h3>Edit Account</h3> <br/><br/>
          
            <h5>Account Detail</h5> <br/>
            <div>
              <div className="card card-body mb-2 mr-5">
                <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                  <div className="media-body">
                    <div className="mb-2 d-flex justify-content-start align-items-center" >
                      <form action="">
                        <input type="text" placeholder="Edit Name" style={{margin: 10, width:350}}/>
                        <input type="text" placeholder="Edit Role" style={{margin: 10, width:350}}/>
                        <input type="number" placeholder="Edit Username" style={{margin: 10, width:350}}/>
                        <input type="text" placeholder="Edit Password" style={{margin: 10, width:350}}/>
                        
                        <button className="btn btn-sm btn-outline-primary" type="submit" style={{margin: 10, width:100}}>Save</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    
  )
}
