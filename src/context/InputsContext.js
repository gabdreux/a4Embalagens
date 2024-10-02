import React, { createContext, useContext, useState } from 'react';

const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (name, value) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetInputs = () => {
    setInputValues({}); // Resetar para um objeto vazio
  };

  return (
    <InputContext.Provider value={{ inputValues, handleInputChange, resetInputs }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => useContext(InputContext);
