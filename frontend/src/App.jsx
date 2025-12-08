import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

import { AuthProvider } from './context/AuthContext'
import { RoomProvider } from './context/RoomContext'

import { Toaster } from "react-hot-toast";

import { SettingsProvider } from './context/SettingsContext'
import { SocketProvider } from './context/SocketContext'
import Layout  from "./components/Layout"
const App = () => {
  const API = import.meta.env.VITE_API_URL
  const fetch = async () => {
    const data = await axios.get(`${API}/api/auth/me`)
    console.log(data);
  };

  useEffect(() => {
    fetch();
  }, []);
// "U25BX8"
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoomProvider>
          <SettingsProvider>
             <SocketProvider> 
          <BrowserRouter>
           <Toaster position="top-center" />
           <Layout />

          </BrowserRouter>
           </SocketProvider>
          </SettingsProvider>
        </RoomProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
