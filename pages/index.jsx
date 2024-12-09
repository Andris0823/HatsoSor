import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/index.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
  
    if (username === 'admin' && password === 'admin') {
      //localStorage.setItem("driverId", "1");  // Use numeric ID for admin
      router.push('/admin');
    } else if (username === 'user' && password === 'user') {
      //localStorage.setItem("driverId", "2");  // Use numeric ID for user
      router.push('/sofor/profil');
    } else {
      setErrorMessage('Hibás felhasználónév vagy jelszó!');
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <h1>Hátsó Sor KFT.</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Bejelentkezés
        </button>
      </form>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <a href="/forgot-password" className={styles.forgotPassword}>
        Jelszó emlékeztető
      </a>
    </div>
  );
}
