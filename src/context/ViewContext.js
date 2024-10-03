import React, { createContext, useState, useContext, useEffect } from 'react';

const ViewContext = createContext();

export const useView = () => useContext(ViewContext);

// Provedor do contexto para encapsular a aplicação
export const ViewProvider = ({ children }) => {
  // Recupera a view do localStorage ou define uma view padrão
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('activeView') || 'CRIAR ORÇAMENTO';
  });

  // Efeito para persistir a view no localStorage sempre que ela mudar
  useEffect(() => {
    localStorage.setItem('activeView', activeView);
  }, [activeView]);

  // Função para mudar a visualização ativa
  const changeView = (view) => setActiveView(view);

  return (
    <ViewContext.Provider value={{ activeView, changeView }}>
      {children}
    </ViewContext.Provider>
  );
};
