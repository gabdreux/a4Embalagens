import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Importar a configuração do Firebase
import { onAuthStateChanged } from 'firebase/auth'; // Firebase listener para mudanças no estado de autenticação

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Limpa o listener ao desmontar
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
