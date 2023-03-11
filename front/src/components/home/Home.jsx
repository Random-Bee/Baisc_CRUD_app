import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import './home.css'

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const res  = await axios.get("http://localhost:5000/api/get");
        // const res  = await axios.get("https://ModernArcticSequence.aayushkumar03.repl.co/api/get");
        setData(res.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if(window.confirm("Are you sure you want to delete this contact?")){
            axios.post(`http://localhost:5000/api/delete/${id}`);
            toast.success("Contact deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div className='Home'>
            <table className='Home__table'>
                <thead>
                    <tr>ID</tr>
                    <tr>First Name</tr>
                    <tr>Last Name</tr>
                    <tr>Email</tr>
                    <tr>Action</tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return(
                            <tr key={item.ID}>
                                <th>{index+1}</th>
                                <td>{item.First_Name}</td>
                                <td>{item.Last_Name}</td>
                                <td>{item.Email}</td>
                                <td>
                                    <Link to={`/update/${item.ID}`}>
                                        <button className='Home-btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='Home-btn btn-delete' onClick={() => deleteContact(item.ID)}>Delete</button>
                                    <Link to={`/info/${item.ID}`}>
                                        <button className='Home-btn btn-get'>Get</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to={'/add'}>
                <button className='Home-btn btn-add'>Add User</button>
            </Link>
        </div>
    )
}

export default Home