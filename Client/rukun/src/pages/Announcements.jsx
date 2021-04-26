import React,{ useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import AnnouncementForm from '../components/AnnouncementForm'
import { useSelector,useDispatch } from 'react-redux'
import { getData } from '../store/actions/admin'

export default function Transaction() {
  const data = useSelector(state => state.admin.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  },[dispatch])

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
            <h3>Announcements</h3>
            
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
            <h5>New Announcement</h5><br/>
            <AnnouncementForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
