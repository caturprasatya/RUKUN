import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteVillagers } from '../store/actions/village'
import { changeAdmin,adminLogout } from '../store/actions/admin'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
toast.configure();

export default function VillagerList(props) {
  const { id, name, role } = props.user
  const villageName = props.village
  const index = props.index
  const dispatch = useDispatch()
  const history = useHistory()

  function destroyVillager(id) {
    if(role === 'admin') {
      toast.error(`Cannot delete admin`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the account.",
        showCancelButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteVillagers(id))
          Swal.fire(`${name} deleted`, '', 'success')
        }
      })
    }
  }

  function demoteAdmin(id) {
    if(role !== 'admin') {
      Swal.fire({
        title: "Are you sure?",
        text: "You will transfer your admin privilage to this account",
        showCancelButton: true,
        confirmButtonText: `Promote`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(changeAdmin(id))
          dispatch(adminLogout())
          Swal.fire('Admin privilage tranferred', '', 'success')
          history.push('/')
        }
      })
    } else {
      toast.error(`You can only promote member`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{villageName}</td>
      <td>{role}</td>
      <td><button type="button" className="btn btn-sm btn-outline-danger mr-2" onClick={() => destroyVillager(id)}>Delete</button>
      <button type="button" className="btn btn-sm btn-outline-warning" onClick={() => demoteAdmin(id)}>Change Role</button></td>
    </tr>
  )
}
