import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import LoginPage from './pages/login'
import About from './pages/About'
import CreateRoomModal from './pages/CreateRoom'
import { AuthProvider } from './context/AuthContext'
import { RoomProvider } from './context/RoomContext'
import RoomPage from './pages/Roompage'
import JoinRoom from './pages/JoinRoom'
import { Toaster } from "react-hot-toast";
import SettingsContent from './pages/Setting'
const App = () => {
  const fetch = async () => {
    const data = await axios.get("/api/auth")
    console.log(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <RoomProvider>
          <BrowserRouter>
           <Toaster position="top-center" />
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/about' element={<About />} />

              <Route path='/create-room' element={<CreateRoomModal />} />
              <Route path='/active-room' element={<SettingsContent />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
              <Route path='/join-room' element={<JoinRoom />} />


            </Routes>

          </BrowserRouter>
        </RoomProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
