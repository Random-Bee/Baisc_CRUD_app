import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Home from './components/home/Home'
import Get from './components/get/Get'
import AddEdit from './components/addEdit/AddEdit'

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='bottom-right' />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/info/:id' element={<Get />} />
          <Route exact path='/add' element={<AddEdit />} />
          <Route exact path='/update/:id' element={<AddEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App