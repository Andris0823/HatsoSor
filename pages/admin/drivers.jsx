import React, { useState, useEffect } from "react";
import styles from "../../styles/admin_drivers.module.css";
import { useRouter } from "next/router";

const AdminDrivers = () => {
  const router = useRouter();
  const [drivers, setDrivers] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [showNewDriverPopup, setShowNewDriverPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  // New driver form fields
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPlateNumber, setNewPlateNumber] = useState("");

  // Edit driver form fields
  const [editDriver, setEditDriver] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPlateNumber, setEditPlateNumber] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Fetch all drivers from the backend
  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:8080/employees");
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result = await response.json();
      setDrivers(result);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  // Handle "Back to Main" button
  const handleBackToMain = () => {
    router.push("/admin");
  };

  // Handle new driver form submission
  const handleNewDriver = async () => {
    const newDriver = {
      name: newName,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      address: newAddress,
      plateNumber: newPlateNumber,
    };

    try {
      const response = await fetch("http://localhost:8080/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDriver),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      setResponseMessage(`Driver added: ${result.name}`);
      setShowNewDriverPopup(false); // Close the popup
      fetchDrivers(); // Re-fetch the list of drivers
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  // Handle edit driver form submission
  const handleUpdateDriver = async () => {
    const updatedDriver = {
      name: editName,
      email: editEmail,
      phoneNumber: editPhoneNumber,
      plateNumber: editPlateNumber,
      address: editAddress,
    };

    try {
      const response = await fetch(`http://localhost:8080/employees/${editDriver.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDriver),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      setResponseMessage(`Driver updated: ${result.name}`);
      setShowEditPopup(false); // Close the popup
      fetchDrivers(); // Re-fetch the list of drivers
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  // Handle delete driver
  const handleDeleteDriver = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      setResponseMessage("Driver deleted successfully.");
      fetchDrivers(); // Re-fetch the list of drivers
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  // Handle edit button click
  const handleEditDriver = (driver) => {
    setEditDriver(driver);
    setEditName(driver.name);
    setEditEmail(driver.email);
    setEditAddress(driver.address);
    setEditPlateNumber(driver.plateNumber);
    setEditPhoneNumber(driver.phoneNumber);
    setShowEditPopup(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Sofőrök</h1>
        <button className={styles.logoutButton} onClick={() => router.push("/")}>
          Kijelentkezés
        </button>
        <button className={styles.driversAdd} onClick={() => setShowNewDriverPopup(true)}>
          Új sofőr
        </button>
        <button className={styles.backToMain} onClick={handleBackToMain}>
          Vissza a fő oldalra
        </button>
      </header>
      <main className={styles.adminMain}>
        <table className={styles.driverTable}>
          <thead>
          <tr>
            <th>Név</th>
            <th>Lakcím</th>
            <th>Telefonszám</th>
            <th>Rendszám</th>
            <th>Email</th>
            <th>Műveletek</th>
          </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.name}</td>
                <td>{driver.address}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.plateNumber}</td>
                <td>{driver.email}</td>
                <td>
                  <button
                    className={styles.adminDriversEditButton}
                    onClick={() => handleEditDriver(driver)}
                  >
                    Szerkesztés
                  </button>
                  <button
                    className={styles.adminDriversDeleteButton}
                    onClick={() => handleDeleteDriver(driver.id)}
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {responseMessage && <p className={styles.response}>{responseMessage}</p>}
      </main>

      {/* New Driver Popup */}
      {showNewDriverPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Új sofőr hozzáadása</h2>
            <label>Név:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <label>Telefonszám:</label>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
            <label>Lakcím:</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <label>Rendszám:</label>
            <input
              type="text"
              value={newPlateNumber}
              onChange={(e) => setNewPlateNumber(e.target.value)}
            />
            <div className={styles.popupActions}>
              <button onClick={handleNewDriver}>Create</button>
              <button onClick={() => setShowNewDriverPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Driver Popup */}
      {showEditPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Edit Driver</h2>
            <label>Név:</label>
            <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
            />
            <label>Lakcím:</label>
            <input
                type="text"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
            />
            <label>Telefonszám:</label>
            <input
                type="text"
                value={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
            />
            <label>Rendszám:</label>
            <input
                type="text"
                value={editPlateNumber}
                onChange={(e) => setEditPlateNumber(e.target.value)}
            />
            <label>Email:</label>
            <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
            />
            <div className={styles.popupActions}>
              <button onClick={handleUpdateDriver}>Update</button>
              <button onClick={() => setShowEditPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDrivers;
