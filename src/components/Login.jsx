import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '300px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '20px',
    },
    tab: {
      flex: 1,
      padding: '10px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    },
    activeTab: {
      borderBottom: '2px solid blue',
      color: 'blue',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '3px',
    },
    button: {
      width: '100%',
      padding: '10px',
      background: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
    eyeIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    },
    passwordContainer: {
      position: 'relative',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>A4 Embalagens</h1>
      <div style={styles.tabContainer}>
        <button
          style={{...styles.tab, ...(isLogin ? styles.activeTab : {})}}
          onClick={() => setIsLogin(true)}
        >
          Entrar
        </button>
        <button
          style={{...styles.tab, ...(!isLogin ? styles.activeTab : {})}}
          onClick={() => setIsLogin(false)}
        >
          Registrar
        </button>
      </div>
      <form>
        <p>Informe e-mail e senha para realizar o {isLogin ? 'login' : 'cadastro'}.</p>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
        />
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            style={styles.input}
          />
          <span
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span>
        </div>
        {!isLogin && (
          <div style={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              style={styles.input}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        )}
        <button type="submit" style={styles.button}>
          {isLogin ? 'Entrar' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;