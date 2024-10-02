import React, { createContext, useContext, useState } from 'react';

const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (name, value) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <InputContext.Provider value={{ inputValues, handleInputChange }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => useContext(InputContext);
