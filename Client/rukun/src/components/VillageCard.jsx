import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { Modal, Button } from 'react-bootstrap'


export default function VillageCard(props) {
  const history = useHistory()

  function editVillage(event) {
    event.preventDefault()
    history.push('/village/edit')
  }

  return (
    <div className="card card-body mb-2">
      <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
        <div className="media-body">
          <h6>Name: {props.village.name}</h6><br/>
          <h6>Location: {props.village.location}</h6><br/>
          <h6>Invitation Code: {props.village.invitation_code}</h6><br/>
          <button type="button" className="btn btn-outline-warning" onClick={editVillage}>Edit</button>
      </div>
    </div>
  </div>
  )
}
