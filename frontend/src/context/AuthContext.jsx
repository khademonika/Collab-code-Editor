// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
import React from "react";

//  const AuthProvider = ({ children }) => {
 

//   const [isLogin, setIsLogin] = useState(true);

//   const [user, setUser] = useState(null);      // store user data
//   const [loading, setLoading] = useState(true); // for checking auth state
// const [isAuthenticated, setAuth] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) fetchMe(token);
//   }, []);
//   // Check if user exists when app loads
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const res = await axios.get("/api/auth/me"); // backend route
//         setUser(res.data.user);
//       } catch (err) {
//         setUser(null);
//       }
//       setLoading(false);
//     };
//     checkUser();
//   }, []);

//   // Login user
//   const login = (userData) => {
//      localStorage.setItem("token", token);
//     setUser(userData);
//     setAuth(true);
//   };
//   //  const login = (data, token) => {
//   //   setUser(data);
//   //   setToken(token);
//   //   localStorage.setItem("token", token);
//   // };

//   // Logout user
//   const logout = async () => {
//     await axios.get("/api/auth/logout");
//     setUser(null);
//     window.location.href = "/"; // back to login page
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, isLogin, setIsLogin,isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//  const AuthContext = createContext();
// // Custom hook
// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider
// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     if (token) fetchUser();
//   }, [token]);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(res.data.user);
//     } catch (error) {
//       console.log(error);
//       setUser(null);
//     }
//   };

//   const login = (data, token) => {
//     setUser(data);
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attach token to every axios request
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchMe();
    } else {
      setLoading(false);
    }
  }, []);

  // GET /api/auth/me
  const fetchMe = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  };

  // Login (save token + user)
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        login, 
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
