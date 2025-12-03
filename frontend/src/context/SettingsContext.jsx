// import { createContext, useContext, useState } from "react";
import React from "react";
// const SettingsContext = createContext();

// export const SettingsProvider = ({ children }) => {
//   const [fontSize, setFontSize] = useState(16); // default size

//   return (
//     <SettingsContext.Provider value={{ fontSize, setFontSize }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// export const useSettings = () => useContext(SettingsContext);
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [tabSize, setTabSize] = useState(2);
  const [wordWrap, setWordWrap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);

  return (
    <SettingsContext.Provider value={{
      fontSize, setFontSize,
      tabSize, setTabSize,
      wordWrap, setWordWrap,
      lineNumbers, setLineNumbers,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
