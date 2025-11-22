import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
useEffect(() => {
  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
