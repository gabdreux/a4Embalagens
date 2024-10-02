import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Usar o contexto de autenticação

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />; // Redirecionar para a página de login
  }

  return children; // Renderizar o componente se o usuário estiver logado
};

export default ProtectedRoute;
