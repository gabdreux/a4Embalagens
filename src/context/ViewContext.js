import React, { createContext, useState, useContext } from 'react';

const ViewContext = createContext();


export const useView = () => useContext(ViewContext);

// Provedor do contexto para encapsular a aplicação
export const ViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('CRIAR ORÇAMENTO'); // Define uma view padrão

  // Função para mudar a visualização ativa
  const changeView = (view) => setActiveView(view);

  return (
    <ViewContext.Provider value={{ activeView, changeView }}>
      {children}
    </ViewContext.Provider>
  );
};
