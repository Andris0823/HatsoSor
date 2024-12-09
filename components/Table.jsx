import styles from '../styles/sofor.module.css';
import { useState, useEffect } from "react";

const Table = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all routes without filtering by driverId
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:8080/routes"); // Fetching all routes
        if (!response.ok) throw new Error("Failed to fetch routes");
        const data = await response.json();
        console.log("Fetched routes data:", data);

        if (data && data.length > 0) {
          setRoutes(data);
        } else {
          //setErrorMessage("No routes available");
        }
      } catch (error) {
        console.error("Error fetching routes:", error.message);
        setErrorMessage("Error loading routes");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []); // Empty dependency array ensures it runs only once when component mounts

  if (loading) {
    return <div>Loading routes...</div>;
  }

  return (
    <section className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Legutóbbi Fuvarok</h2>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <table className={styles.driverTable}>
        <thead>
          <tr>
            <th>Dolgozó neve</th>
            <th>Útvonal</th>
            <th>Szállítmány</th>
            <th>Távolság (km)</th>
            <th>Dátum</th>
            <th>Időtartam</th>
            <th>Státusz</th>
          </tr>
        </thead>
        <tbody>
          {routes.length > 0 ? (
            routes.map((route) => (
              <tr key={route.id}>
                <td>{route.employee.name}</td>
                <td>{route.route}</td>
                <td>{route.deliveredGoods}</td>
                <td>{route.distance}</td>
                <td>{route.date}</td>
                <td>{route.duration}</td>
                <td>{route.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nincsenek elérhető fuvarok</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
