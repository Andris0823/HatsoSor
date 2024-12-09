// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import Table from '../components/Table';
import styles from '../styles/sofor.module.css';

const Sofor = () => {
  

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>Sofőr Oldal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="../public/kicsikocsi.png" />
      </Head>

      <Header />
      <main className={styles.mainContent}>
        <Table />
      </main>
    </div>
  );
}

export default Sofor;
