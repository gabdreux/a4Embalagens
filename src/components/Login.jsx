import React, { useState } from 'react';
import '../styles/Login.css';
import { auth } from '../firebase'; // Importar a configuração do Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Métodos de login e registro
import { useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/LOGO A4 Embalagens -Cortada.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetar erros

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (isLogin) {
        // Login com e-mail e senha
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login realizado com sucesso!');
        navigate('/home');
      } else {
        // Registro de novo usuário
        if (password !== confirmPassword) {
          setError('As senhas não coincidem.');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Usuário registrado com sucesso!');
        navigate('/home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (


    <div className="container">

      <div className="center">
        <img src={logo} alt="A4 Embalagens" className="loginLogo" />
      </div>


      <div className="tab-container">
        <button
          className={`tab ${isLogin ? 'active-tab' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Entrar
        </button>
        <button
          className={`tab ${!isLogin ? 'active-tab' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Registrar
        </button>
      </div>

      <p>Por favor, faça o {isLogin ? 'login' : 'cadastro'} para continuar.</p>

      <div className="loginFormBox">

      <form onSubmit={handleSubmit}>
        


        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />



        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>


        {!isLogin && (
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit" className="button">
          {isLogin ? 'Entrar' : 'Registrar'}
        </button>

      </form>
      </div>
    </div>
  );
};

export default Login;
