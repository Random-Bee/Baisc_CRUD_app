import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import './get.css'

const Get = () => {

  const [user, setUser] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((res) => {
      setUser(res.data[0])
    });
  }, [id]);

  return (
    <div className='Get'>
      <div className="Get__card">
        <div className="Get__card-header">
          <p>User Details</p>
        </div>
        <div className="Get__container">
          ID: {user.ID}<br/>
          First Name: {user.First_Name}<br/>
          Last Name: {user.Last_Name}<br/>
          Email: {user.Email}<br/>
        </div>
      </div>
      <Link to='/'>
        <button className='Get__btn'>Go Back</button>
      </Link>
    </div>
  )
}

export default Get