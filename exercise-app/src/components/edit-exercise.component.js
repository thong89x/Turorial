import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import DatePicker from 'react-datepicker';
export default function EditExercise() {
  const {id} = useParams()
  const navigate = useNavigate()
  const usernameRef = useRef()
  const descriptionRef = useRef()
  const durationRef = useRef()
  const [date,setDate] = useState(new Date())
  const [users,setUsers] = useState([])
  console.log(id)
  useEffect(()=>{
    axios.get('http://localhost:5000/users/')
      .then(response => {
        console.log(response.data)
        if (response.data.length > 0) {
          setUsers(()=>{
            return response.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then(response => {
        console.log(response.data)
        if (response.data) {
          console.log(response.data)
          usernameRef.current.value = response.data.username
          descriptionRef.current.value = response.data.description
          durationRef.current.value = response.data.duration
          setDate(()=>{
            return new Date(response.data.date)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
  },[])
  
  function handleSubmit(e){
    e.preventDefault()  

    const exercise ={
      username: usernameRef.current.value,
      description : descriptionRef.current.value,
      duration : durationRef.current.value
      // date: date
    }
    console.log(exercise)
    axios.post(`http://localhost:5000/exercises/update/${id}`,exercise)
      .then(res=> console.log(res.data))
    navigate("/")
  }
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref= {usernameRef}
              required
              className="form-control">
              {
                users.map(function(user) {
                  return <option 
                    key={user._id}
                    value={user.name}>{user.name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input ref= {descriptionRef} 
              type="text"
              required
              className="form-control"
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              ref= {durationRef}
              type="number" 
              required
              className="form-control"
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>

        <div className="form-group">
          <button type="submit"className="btn btn-primary" >Update Exercise Log</button>
        </div>
      </form>
    </div>
  )
}
