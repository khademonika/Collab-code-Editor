import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import React from "react";
import Home from "../pages/Home"
import LoginPage from "../pages/login"
import About from "../pages/About"
import CreateRoomModal from "../pages/CreateRoom"
import Settings from "../pages/Setting"
import RoomPage from "../pages/Roompage"
import JoinRoom from "../pages/JoinRoom"
import Navbar from "./Navbar";
function Layout() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/room/") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/create-room' element={<CreateRoomModal />} />
        <Route path='/settings' element={<Settings />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path='/join-room' element={<JoinRoom />} />
      </Routes>
    </>
  );
}

export default Layout
