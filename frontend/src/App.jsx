import React, { useEffect, useState } from 'react'
import axios from "axios"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import LoginPage from './pages/login'
import About from './pages/About'
import CreateRoomModal from './pages/CreateRoom'
import {AuthProvider}  from './context/AuthContext'
import ActiveRoom from './pages/ActiveRoom'
import RoomProvider from './context/RoomContext'

const App = () => {
  const fetch = async()=>{
    const data = await axios.get("/api/auth")
    console.log(data);
    
  }
useEffect(()=>{
  fetch()
},[])
  return (
    <ThemeProvider>
      <AuthProvider>
   <BrowserRouter>
   <Navbar/>
   <RoomProvider>
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path='/login' element={<LoginPage />}/>
    <Route path='/about' element={<About/>}/>
   
     <Route path='/create-room' element={<CreateRoomModal/>}/>
    <Route path='/active-room' element={<ActiveRoom/>}/>

  
   </Routes>
    </RoomProvider>
   </BrowserRouter>
   </AuthProvider>
   </ThemeProvider>
  )
}

export default App
// monikakhade@gmail.com
// 123456