// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { useTheme } from '../context/ThemeContext';
// import { useAuth } from '../context/AuthContext';
// import { Code2, Menu } from 'lucide-react';
// const Navbar = () => {
//   const { isDark, setIsDark } = useTheme();
//   const { logout, user } = useAuth()
// const navigate = useNavigate();

//   return (
//    <>
//     <nav className={`flex items-center justify-between px-8 py-6 max-w-7xl mx-auto`}>

//       {/* Left Links */}
//       <div className="flex items-center gap-8">
//           <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//             <Code2 className="w-6 h-6" />
//           </div>
//           <span className="text-2xl font-bold cursor-pointer"> <Link to="/">CollabIDE</Link></span>
//         <p className={`text-lg font-medium cursor-pointer transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
//           <Link to="/">Home</Link> 
//         </p>

//         <Link to='/about'>
//           <button className={`text-lg font-medium cursor-pointer transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
//             About us
//           </button>
//         </Link>

//         {

//           !user ? (
//             <Link to="/login">
//               <button className={`${isDark ? "text-white" : "text-black"} cursor-pointer` }>
//                 Login
//               </button>
//             </Link>
//           ) : (
//             <div>
//               <button
//                 onClick={logout}
//                 className={`${isDark ? "text-white" : "text-black"} cursor-pointer absolute right-32 top-8`}
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={() => navigate("/join-room")}
//                 className="px-4 py-3 text-white rounded-xl cursor-pointer"
//               >
//                 Join Room
//               </button>
//             </div>

//           )


//         }

//         {/* <Link to='/createRoom'>
//           <button className={`text-lg font-medium transition-colors ${isDark ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'}`}>
//             Create 
//           </button>
//         </Link> */}
//       </div>

//       {/* Theme Toggle */}
//       <button
//         onClick={() => setIsDark(!isDark)}
//         className={`relative w-16 h-8 rounded-full transition-colors duration-300 
//           ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}
//       >
//         <div
//           className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 
//             ${isDark ? 'translate-x-8' : 'translate-x-0'}`}
//         />
//       </button>

//     </nav>

//    </>
//   )
// }

// export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Code2, Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();
   const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
  ];

  return (
    <>
      <nav
        className={`w-full shadow-sm ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Code2 className="w-6 h-6 text-white" />
            </div>

            <Link to="/" className="text-2xl font-extrabold tracking-wide">
              CollabIDE
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={`text-lg font-medium transition-colors ${
                  isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            {!user ? (
              <Link to="/login">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                    isDark
                      ? "border-gray-600 text-white hover:border-blue-400"
                      : "border-gray-300 text-gray-900 hover:border-blue-600"
                  }`}
                >
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/join-room")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Join Room
                </button>

                <button
                  onClick={logout}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isDark
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            {/* <button
              onClick={() => setIsDark(!isDark)}
              className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button> */}
             <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        {theme === "dark" ? (
          <Sun className="text-yellow-300" />
        ) : (
          <Moon className="text-black" />
        )}
      </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className={`md:hidden px-6 pb-4 space-y-4 ${
              isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="block text-lg font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <button className="w-full px-4 py-2 border rounded-lg">
                  Login
                </button>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/join-room");
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Join Room
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={() => setIsDark(!isDark)}
              className="w-full flex items-center justify-center gap-2 py-2 mt-2 border rounded-lg"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
