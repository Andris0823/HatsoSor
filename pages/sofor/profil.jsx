import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import styles from "../../styles/profil.module.css"; // Importing the CSS module for styles

const Profil = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  // Fetch employees data on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data); // Set the fetched data to state
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEmployees(); // Call the fetch function on mount
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      <Header title="Profil" />
      <main className={styles.mainContent}>
        <section className={styles.tableContainer}>
          <table className={styles.profileTable}>
            <thead>
              <tr>
                <th>Név</th>
                <th>Lakcím</th>
                <th>Telefonszám</th>
                <th>Rendszám</th>
                <th>Email cím</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.address || "N/A"}</td>
                    <td>{employee.phoneNumber || "N/A"}</td>
                    <td>{employee.plateNumber || "N/A"}</td>
                    <td>{employee.email || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nincsenek elérhető dolgozók</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Profil;
