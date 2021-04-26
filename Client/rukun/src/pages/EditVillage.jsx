import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setVillageAsync } from '../store/actions/village'
import { toast } from "react-toastify";
import Sidebar from '../components/Sidebar'

export default function EditVillage() {

  const data = useSelector(state => state.admin.data)
  const history = useHistory()
  const dispatch = useDispatch()
  const [village, setVillage] = useState({})

  useEffect(() => {
    if(data) {
      setVillage({ name: data.name, location: data.location })
    }
  },[])

  function onChangeForm(event) {
    let { name, value } = event.target;

    setVillage({
    ...village,
    [name]: value,
    })
  }

  function editVillage(event) {
    event.preventDefault()
    // console.log(village, "data baruuuu")
    dispatch(setVillageAsync(village))
    toast.info(`Village Updated`, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    })
    history.push('/dashboard')
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
            <h3>Edit Village</h3><br/><br/>
            
            <h5>Village Detail</h5><br/>
            <div>
              <div className="card card-body mb-2 mr-5">
                <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                  <div className="media-body">
                    <div className="mb-2 d-flex justify-content-start align-items-center" >
                      <form onSubmit={editVillage}>
                        <input type="text" name="name" value={village.name} style={{margin: 10, width:350}} onChange={onChangeForm}/>
                        <input type="text" name="location" value={village.location} style={{margin: 10, width:350}} onChange={onChangeForm}/>
                        
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
