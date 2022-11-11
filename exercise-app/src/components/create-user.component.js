import React, { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
export default function CreateUser() {
  const navigate = useNavigate()
  const usernameRef = useRef()
  function handleSubmit(e){
    e.preventDefault()  

    const user ={
      name: usernameRef.current.value
    }
    axios.post('http://localhost:5000/users/add',user)
      .then(res=> console.log(res.data))
    console.log(user)
    navigate("/")
  }
  return (
    <div>
       <form onSubmit={handleSubmit}>
       <div className="form-group"> 
          <label>Username: </label>
          <input ref= {usernameRef} 
              type="text"
              required
              className="form-control"
              />
        </div>
        <div className="form-group">
          <button type="submit"className="btn btn-primary" >Create Exercise Log</button>
        </div>
       </form>
    </div>
  )
}
