import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import './home.css'
import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Box } from '@mui/material'

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/get");
    // const res  = await axios.get("https://ModernArcticSequence.aayushkumar03.repl.co/api/get");
    setData(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios.post(`http://localhost:5000/api/delete/${id}`);
      toast.success("Contact deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  }

  return (
    <Container>
      <Box className='Home scale-up-center' style={{padding: '1rem'}}>
        <TableContainer component={Paper} sx={{ maxHeight: '400px'}} >
          <Table aria-label='User Info' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align='center'style={{ padding:'1rem'}} sx={{bgcolor:'black', color:'white', fontWeight:'bold', fontSize:'1rem'}}>ID</TableCell>
                <TableCell align='center'style={{ padding:'1rem'}} sx={{bgcolor:'black', color:'white', fontWeight:'bold', fontSize:'1rem'}}>First Name</TableCell>
                <TableCell align='center'style={{ padding:'1rem'}} sx={{bgcolor:'black', color:'white', fontWeight:'bold', fontSize:'1rem'}}>Last Name</TableCell>
                <TableCell align='center'style={{ padding:'1rem'}} sx={{bgcolor:'black', color:'white', fontWeight:'bold', fontSize:'1rem'}}>Email</TableCell>
                <TableCell align='center'style={{ padding:'1rem'}} sx={{bgcolor:'black', color:'white', fontWeight:'bold', fontSize:'1rem'}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={item.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center'>{index + 1}</TableCell>
                    <TableCell align='center'>{item.First_Name}</TableCell>
                    <TableCell align='center'>{item.Last_Name}</TableCell>
                    <TableCell align='center'>{item.Email}</TableCell>
                    <TableCell align='center'>
                      <Box className='btn-columns'>
                        <Link to={`/update/${item.ID}`} style={{ textDecoration: 'none' }}>
                          <Button className='Home-btn-btn' variant='contained' color='secondary'>Edit</Button>
                        </Link>
                        <Button className='Home-btn-btn' onClick={() => deleteContact(item.ID)} variant='contained' color='error'>Delete</Button>
                        <Link to={`/info/${item.ID}`} style={{ textDecoration: 'none' }}>
                          <Button className='Home-btn-btn' variant='contained'>Get</Button>
                        </Link>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className='Home-btn-container'>
          <Link to={'/add'} style={{ textDecoration: 'none' }}>
            <Button className='Home-btn btn-add' variant='contained' color='success'>Add User</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Home