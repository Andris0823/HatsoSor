import styles from '../styles/sofor.module.css';
import { useRouter } from "next/router";

const Header = () => {

    const router = useRouter();

    const handleLogout = () => {
        router.push("/"); // Replace with actual logout logic or redirect
    };

    const handleDriverClick = () => {
        router.push("/sofor/fuvarjaim"); // Navigate to the drivers page
    };

    const handleProfileClick = () => {
        router.push("/sofor/profil"); // Navigate to the routes page
    };

    return (
        <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Sofőr Panel</h1>
        <div className={styles.adminButtons}>
            <button 
                className={styles.myTripsButton}
                onClick={handleDriverClick}
            >
            Fuvarjaim
            </button>
            <button 
                className={styles.profileButton}
                onClick={handleProfileClick}
            >
            Profil
            </button>
            <button className={styles.logoutButton} onClick={handleLogout}>
          Kijelentkezés
        </button>
        </div>
        </header>
    );
};

export default Header;