import React from "react";
// import { createContext, useContext, useEffect, useState } from "react";

import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "light"
//   );

//   useEffect(() => {
//     // Apply theme to <html>
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);


const ThemeContext = createContext()

export const useTheme = ()=>{
  return useContext(ThemeContext)
}

export const ThemeProvider = ({children})=>{
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = ()=>{
    setIsDark(prev=>!prev)
  }

  const theme = isDark ?"dark":"light"
  useEffect(()=>{
document.documentElement.setAttribute("data-theme", theme)
  },[isDark])
  return <ThemeContext.Provider value={{theme, toggleTheme}}>
    {children}
  </ThemeContext.Provider>
}