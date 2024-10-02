import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/AuthContext'; // Importar o AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Importar a rota protegida
import { InputProvider } from './context/InputsContext'; // Importar o contexto



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <InputProvider>
                <HomePage />
                </InputProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
