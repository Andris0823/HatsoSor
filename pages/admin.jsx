import React from "react";
import styles from "../styles/admin.module.css";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/"); // Replace with actual logout logic or redirect
  };

  const handleDriversClick = () => {
    router.push("/admin/drivers"); // Navigate to the drivers page
  };

  const handleRoutesClick = () => {
    router.push("/admin/routes"); // Navigate to the routes page
  };

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Admin Felület</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Kijelentkezés
        </button>
      </header>
      <main className={styles.adminMain}>
        <div className={styles.adminMenu}>
          <button
            className={styles.adminMenuButton}
            onClick={handleDriversClick}
          >
            Sofőrök
          </button>
          <button
            className={styles.adminMenuButton}
            onClick={handleRoutesClick}
          >
            Útvonalak
          </button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
