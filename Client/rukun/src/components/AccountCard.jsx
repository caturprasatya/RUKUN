import React from 'react'

export default function AccountCard(props) {
  return (
    <div className="card card-body mb-2 mt-3">
    <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
      <div className="media-body">
        <h6>Name: {props.admin.name.charAt(0).toUpperCase() + props.admin.name.slice(1)}</h6><br/>
        <h6>Username: {props.admin.username}</h6><br/>
        <h6>Role: Admin</h6>
      </div>
    </div>
  </div>
  )
}
