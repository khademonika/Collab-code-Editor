import React, { useState } from 'react'
// import Home from './assets/pages/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import LoginPage from './pages/login'
import About from './pages/About'
import CreateRoomModal from './pages/CreateRoom'

const App = () => {

  return (
    <ThemeProvider>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path='/login' element={<LoginPage />}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/createRoom' element={<CreateRoomModal/>}/>

   </Routes>
   </BrowserRouter>
   </ThemeProvider>
  )
}

export default App
