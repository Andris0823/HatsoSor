import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/index.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      alert(
        'Helyi hálózatról nem tudtuk kiküldeni az e-mailt. Kérjük próbáljon emlékezni a jelszavára.'
      );
      router.push('/');
    } else {
      alert('Kérlek add meg az email címet!');
    }
  };

  return (
    <div className={styles.container}> {/* Apply container style */}
      <div className={styles.loginContainer}> {/* Apply login container style */}
        <h1>Jelszó emlékeztető</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}> {/* Apply inputField style */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>Küldés</button> {/* Apply loginButton style */}
        </form>
      </div>
    </div>
  );
}