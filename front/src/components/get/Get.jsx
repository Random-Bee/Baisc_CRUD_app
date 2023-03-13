import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import './get.css'
import {Box, Button, Stack, Typography} from '@mui/material'

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
    <Box className='Get slide-top'>
      <Box className="Get__card" sx={{boxShadow:3, p:'1rem 3rem'}}>
        <Box className="Get__card-header" align='center' sx={{m:'1.5rem 1rem 1rem 1rem'}}>
          <Typography variant='h5' color='info'>User Details</Typography>
        </Box>
        <Stack spacing={3} direction='column' className="Get__container">
          <Typography>
          ID: {user.ID}<br/>
          </Typography>
          <Typography>
          First Name: {user.First_Name}<br/>
          </Typography>
          <Typography>
          Last Name: {user.Last_Name}<br/>
          </Typography>
          <Typography>
          Email: {user.Email}<br/>
          </Typography>
        </Stack>
      </Box>
      <Link to='/' style={{textDecoration:'none'}}>
        <Button variant='contained' color='info' className='Get__btn' style={{marginTop: '1rem'}}>Go Back</Button>
      </Link>
    </Box>
  )
}

export default Get