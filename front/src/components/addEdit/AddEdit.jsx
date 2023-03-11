import React, {useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import './addEdit.css'

const initial = {
  fname: '',
  lname: '',
  email: ''
}

const AddEdit = () => {

  const [state, setState] = useState(initial);
  const {fname, lname, email} = state;

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((res) => {
      setState({fname:res.data[0].First_Name, lname:res.data[0].Last_Name, email:res.data[0].Email});
    })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(fname === '' || lname === '' || email === ''){
      return toast.error('Please fill all the fields');
    }
    else if(!id) {
      axios.post("http://localhost:5000/api/post", {fname, lname, email}).then(() => {
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
      axios.put(`http://localhost:5000/api/update/${id}`, {fname, lname, email}).then(() => {
        setState(initial);
      }).catch((err) => {
        console.log(err);
      });
      toast.success('User information ipdated successfully');
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  }

  return (
    <div className='AddEdit'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Name</label>
        <input type="text" id="fname" name="fname" placeholder='First Name' value={fname || ""} onChange={handleInputChange} />
        <input type="text" id="lname" name="lname" placeholder='Last Name' value={lname || ""} onChange={handleInputChange} />
        <input type="text" id="email" name="email" placeholder='Email' value={email || ""} onChange={handleInputChange} />
        <input type="submit" value={id? "Update" : "Add"}/>
        <Link to={'/'}>
          <button className='AddEdit-btn'>Go Back</button>
        </Link>
      </form>
    </div>
  )
}

export default AddEdit