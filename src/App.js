import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { InputProvider } from './context/InputsContext';
import { ViewProvider } from './context/ViewContext';
import { ProposalProvider } from './context/ProposalContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ViewProvider>
                <ProposalProvider>
                  <InputProvider>
                    <HomePage />
                  </InputProvider>
                  </ProposalProvider>
                </ViewProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
