import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import './home.css'
import { Slide, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Box, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


var itemID = 0;

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/get");
    setData(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    itemID = id;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const deleteContact = () => {
    axios.post(`http://localhost:5000/delete/${itemID}`);
    toast.success("Contact deleted successfully");
    setTimeout(() => loadData(), 500);
  }

  const agreeDeletion = () => {
    deleteContact();
    handleClose();
  }

  return (
    <Container>
      <Box className='Home scale-up-center' style={{ padding: '1rem' }}>
        <TableContainer component={Paper} sx={{ maxHeight: '400px' }} >
          <Table aria-label='User Info' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ padding: '1rem' }} sx={{ bgcolor: 'black', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>ID</TableCell>
                <TableCell align='center' style={{ padding: '1rem' }} sx={{ bgcolor: 'black', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>First Name</TableCell>
                <TableCell align='center' style={{ padding: '1rem' }} sx={{ bgcolor: 'black', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Last Name</TableCell>
                <TableCell align='center' style={{ padding: '1rem' }} sx={{ bgcolor: 'black', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
                <TableCell align='center' style={{ padding: '1rem' }} sx={{ bgcolor: 'black', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
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
                          <Button variant="contained" onClick={() => handleClickOpen(item.ID)} color='error'>Delete</Button>

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


        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
        >
          <DialogTitle>{"Delete Contact?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this contact?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={agreeDeletion}>Yes</Button>
          </DialogActions>
        </Dialog>

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