import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from "react-toastify";
import { getVillagers } from '../store/actions/village'
import "react-toastify/dist/ReactToastify.css";
toast.configure();


export default function AnnouncementForm() {
  const history = useHistory()

  const [data, setData] = useState({
    title: '',
    description: '',
  })
  const [isError, setError] = useState(false)

  const villagers = useSelector(state => state.village.village)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVillagers())
  }, [dispatch])

  const sendPushNotification = async(expoPushToken) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: data.title,
      body: data.description,
      data: { someData: 'goes here' }
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      mode: 'no-cors',  
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  // const sendPushNotification = async(message) => {
  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     mode: 'no-cors',  
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }

  function handleInput(e) {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const values = Object.values(data)

    const errors = values.filter(value => value === '')

    if (errors.length) {
      setError(true)
    } else {
      toast.info(`${data.title} announced`, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
      villagers.Users.map(villager => {
        sendPushNotification(villager.push_token)
      })
      setData({
        title: '',
        description: '',
      })
    }

    // if (errors.length) {
    //   setError(true)
    // } else {
    //   let arrExpoToken = []
    //   toast.info(`${data.title} announced`, {
    //     autoClose: 3000,
    //     position: toast.POSITION.TOP_RIGHT,
    //   })
    //   villagers.Users.map(villager => {
    //     arrExpoToken.push({
    //       to: villager.push_token,
    //       sound: 'default',
    //       title: data.title,
    //       body: data.description,
    //       data: { someData: 'goes here' }
    //     })
    //   })
    //   sendPushNotification(arrExpoToken)
    //   setData({
    //     title: '',
    //     description: ''
    //   })
    // }

  }

  return (
    <div className="card card-body mb-2 mr-5">
      <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
        <div className="media-body">
            {
              isError ?
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                Please <strong>fill in all data!.</strong> 
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
               : <></>
            }
          <div className="mb-2 d-flex justify-content-start" >
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Title" value={data.title} onChange={handleInput} style={{ margin: 10, width: 350 }} /> <br></br>
              <input type="textarea" name="description" placeholder="Desciption" value={data.description} onChange={handleInput} style={{ margin: 10, width: 500, height: 200, alignItems: 'start' }} /> <br></br>
              <button className="btn btn-sm btn-outline-primary" type="submit" style={{ margin: 10, width: 100 }}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

