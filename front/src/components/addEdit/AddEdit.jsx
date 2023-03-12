import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import './addEdit.css'
import { Box, Container, Button, Stack, TextField, InputLabel } from '@mui/material'

const initial = {
  fname: '',
  lname: '',
  email: ''
}

const AddEdit = () => {

  const [state, setState] = useState(initial);
  const { fname, lname, email } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((res) => {
      setState({ fname: res.data[0].First_Name, lname: res.data[0].Last_Name, email: res.data[0].Email });
    })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname === '' || lname === '' || email === '') {
      return toast.error('Please fill all the fields');
    }
    else if (!id) {
      axios.post("http://localhost:5000/api/post", { fname, lname, email }).then(() => {
        setState(initial);
      }).catch((err) => {
        console.log(err);
      });
      toast.success('User added successfully');
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
    else {
      axios.put(`http://localhost:5000/api/update/${id}`, { fname, lname, email }).then(() => {
        setState(initial);
      }).catch((err) => {
        console.log(err);
      });
      toast.success('User information updated successfully');
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  return (
    <Box className='AddEdit'>
      <form onSubmit={handleSubmit}>
        <Box>
        <Stack spacing={2} direction='column'>
          <TextField label='First Name' type="text" id="fname" name="fname" placeholder='Enter First Name' value={fname || ""} onChange={handleInputChange} />
          <TextField label='Last Name' type="text" id="lname" name="lname" placeholder='Enter Last Name' value={lname || ""} onChange={handleInputChange} />
          <TextField label='Email' type="text" id="email" name="email" placeholder='Enter Email' value={email || ""} onChange={handleInputChange} />
        </Stack>
        </Box>
        <Box className='AddEdit-btn'>
          <Button type="submit" value variant='contained' color='success'> {id ? "Update" : "Add"} </Button>
        </Box>
        <Box className='AddEdit-btn'>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Button className='AddEdit-btn' variant='contained' color='info'>Go Back</Button>
          </Link>
        </Box>
      </form>
    </Box>
  )
}

export default AddEdit