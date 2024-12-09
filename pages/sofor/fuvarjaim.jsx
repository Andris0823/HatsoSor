import React from 'react';
import Header from '../../components/Header';
import TripTable from '../../components/Table';
import styles from '../../styles/fuvarjaim.module.css';

export default function Fuvarjaim() {
  return (
    <div className={styles.container}>
      <Header title="Fuvarjaim" />
      <main className={styles.mainContent}>
        <TripTable />
      </main>
    </div>
  );
}