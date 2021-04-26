import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import SuggestionCard from '../components/SuggestionCard'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import ClipLoader from "react-spinners/ClipLoader"
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { setSuggestionsAsync, newSuggestion } from '../store/actions/suggestions'
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Suggestions() {
  const history = useHistory()
  const [show, setShow] = useState(false);
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [type, setType] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = useSelector(state => state.suggestions.data)
  const loading = useSelector(state => state.suggestions.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSuggestionsAsync())
  }, [dispatch])

  // function addTitle(event) {
  //   setTitle(event.target.value)
  // }
  // function addDescription(event){
  //   setDescription(event.target.value)
  // }
  // function addType(event){
  //   console.log('hello')
  //   setType(event.target.value)
  //   console.log(type)
  // }

  // function addSuggestion(event) {
  //   event.preventDefault()
  //   const dataBaru = {
  //     title, description, type
  //   }
  //   console.log(dataBaru)
  //   dispatch(newSuggestion(dataBaru))
  //   toast.info(`${title} added to the list`, {
  //     autoClose: 3000,
  //     position: toast.POSITION.TOP_RIGHT,
  //   })
  //   setTitle('')
  //   setDescription('')
  //   setType('')
  //   handleClose()
  // }

  const [dataBaru, setData] = useState({
    title: '',
    description: '',
    type: 'information',
  })
  const [isError, setError] = useState(false)
  // const dispatch = useDispatch()

  function handleInput(e) {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...dataBaru, [name]: value })
    console.log(dataBaru, "<<<handleInput")
  }

  function handleSubmit(e) {
    e.preventDefault()
    const values = Object.values(dataBaru)

    const errors = values.filter(value => value === '')
    console.log(values)
    if (errors.length) {
      setError(true)
    } else {
      // console.log(data);
      toast.info(`${dataBaru.title} added`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
      console.log(dataBaru, "<<<<<")
      dispatch(newSuggestion(dataBaru))
      setData({
        title: '',
        description: '',
        type: 'information',
      })
      handleClose()
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
                <h3>Information</h3>
              <div className="mb-5 mt-5 mr-5 d-flex justify-content-start align-items-center" >
              <div className="d-flex justify-content-end">
                <div style={{marginRight: 5, width: 100}}>
                  <label style={{marginRight: 5, width: 55, marginTop: 5}}>Village:</label>
                </div>
                <input type="text" value={data?.name} disabled="disabled" style={{marginRight: 25, height: 30}}/>
                <div style={{marginRight: 5, width: 120}}>
                  <label style={{marginRight: 5, width: 115, marginTop: 5}}> Invitation Code:</label>
                </div>
                <input type="text" value={data?.invitation_code} disabled="disabled" style={{marginRight: 10, height: 30}}/> <br/>
                <div>
                  <button type="button" className="btn btn-sm btn-outline-info" onClick={handleShow} style={{marginRight: 10, width: 120, height:30, marginTop: 2}} >Add Information</button>
                </div>
                <Modal show={show} 
                  onHide={handleClose} 
                  backdrop="static"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Information</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" name="title" className="form-control" placeholder="Title" onChange={handleInput}/>
                    </div>
                    <div className="form-group">
                      <label>Information</label>
                      <textarea placeholder="Max 200 characters" name="description" maxLength= "200" onChange={handleInput} />
                      <label style={{marginTop: 2}}>Type</label><br></br>
                      <select className="form-select" name="type" onChange={handleInput} style={{ margin: 10, width: 350, height:42.8, marginLeft: 0, marginTop: 2, outline: 0 }}>
                        <option value="information">Information</option>
                        <option value="alert">Alert</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-outline-primary" style={{marginRight:0}}>Submit</button>
                    </div>
                  </form>
                  </Modal.Body>
                  <Modal.Footer>
                  <small id="emailHelp" className="form-text text-muted">Spread the word and let your village know!</small>
                  </Modal.Footer>
                </Modal>

              </div >
              
              </div>
              <div className="overflow-auto mr-5" style={{height: 580}}>
                {
                  loading ? <ClipLoader/> :
                  data.Suggestions?.map((suggestion, index) => {
                    return <SuggestionCard suggestion={suggestion} key={suggestion.id} index={index}></SuggestionCard>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
