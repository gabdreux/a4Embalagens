import React, { useState } from 'react';
import '../styles/Login.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
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
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (isLogin) {

        await signInWithEmailAndPassword(auth, email, password);
        alert('Bem-Vindo!');

        // if (email === 'user@gmail.com') {
        //   localStorage.setItem('role', 'adm');
        // } else {
        //   localStorage.removeItem('role');
        // }

        if (email === 'loja@a4embalagens.com') {
          localStorage.setItem('role', 'adm');
        } else {
          localStorage.removeItem('role');
        }


        navigate('/');
      } else {
        if (password !== confirmPassword) {
          setError('As senhas não coincidem.');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Usuário registrado com sucesso!');   
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    setError('');

    if (!email) {
      alert('Por favor, insira seu e-mail.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('E-mail de redefinição de senha enviado!');
      setShowResetConfirmation(true);
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

        <div className="center">
          <button type="submit" className="button loginButton">
            {isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </div>

      </form>

      <div className="center forgotPassword">
        <p onClick={handlePasswordReset} style={{ cursor: 'pointer'}}>
              Esqueci minha senha
        </p>
      </div>

      </div>
    </div>
  );
};

export default Login;
