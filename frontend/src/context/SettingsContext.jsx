import React from "react";

import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [wordWrap, setWordWrap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);

  return (
    <SettingsContext.Provider value={{
      fontSize, setFontSize,
      wordWrap, setWordWrap,
      lineNumbers, setLineNumbers,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
