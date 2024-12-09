import React, { useState, useEffect } from "react";
import styles from "../../styles/admin_routes.module.css";
import { useRouter } from "next/router";

const AdminRoutes = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [routeDetails, setRouteDetails] = useState({
    route: "",
    deliveredGoods: "",
    distance: "",
    date: "", // New field for date
    duration: "", // New field for duration
    status: "AKTIV", // Default value for status
  });
  const [editMode, setEditMode] = useState(false);
  const [editingRouteId, setEditingRouteId] = useState(null);

  useEffect(() => {
    fetchRoutes();
    fetchEmployees();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:8080/routes");
      if (!response.ok) throw new Error("Failed to fetch routes");
      const data = await response.json();
      setRoutes(
        data.map((route) => ({
          ...route,
          employeeName: route.employee?.name || "Unknown",
        }))
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    setEditMode(false);
    setRouteDetails({
      route: "",
      deliveredGoods: "",
      distance: "",
      date: "", // Reset date
      duration: "", // Reset duration
      status: "AKTIV", // Default status
    });
    setSelectedEmployee("");
  };

  const handleSaveRoute = async () => {
    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `http://localhost:8080/routes/${editingRouteId}`
        : "http://localhost:8080/routes";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...routeDetails,
          employee: { id: selectedEmployee },
        }),
      });

      if (!response.ok)
        throw new Error(`Failed to ${editMode ? "update" : "add"} route`);

      setIsPopupOpen(false);
      fetchRoutes();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditRoute = (route) => {
    setRouteDetails({
      route: route.route,
      deliveredGoods: route.deliveredGoods,
      distance: route.distance,
      date: route.date, // Pre-fill date
      duration: route.duration, // Pre-fill duration
      status: route.status, // Pre-fill status
    });
    setSelectedEmployee(route.employee.id);
    setEditingRouteId(route.id);
    setEditMode(true);
    setIsPopupOpen(true);
  };

  const handleDeleteRoute = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/routes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete route");

      fetchRoutes();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBackToMain = () => {
    router.push("/admin");
  };

  return (
    <div className={styles.container}>
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Útvonalak</h1>
        <button
          className={styles.logoutButton}
          onClick={() => router.push("/")}
        >
          Kijelentkezés
        </button>
        <button className={styles.routesAdd} onClick={handleOpenPopup}>
          Új útvonal
        </button>
        <button
          className={styles.backToMain}
          id="back-to-main"
          onClick={handleBackToMain}
        >
          Vissza a fő oldalra
        </button>
      </header>
      <main className={styles.adminMain}>
        <table className={styles.routesTable}>
          <thead>
            <tr>
              <th>Dolgozó</th>
              <th>Útvonal</th>
              <th>Rakomány típusa</th>
              <th>Távolság</th>
              <th>Dátum</th>
              <th>Időtartam</th>
              <th>Státusz</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>{route.employeeName}</td>
                <td>{route.route}</td>
                <td>{route.deliveredGoods}</td>
                <td>{route.distance}</td>
                <td>{route.date}</td>
                <td>{route.duration}</td>
                <td>{route.status}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditRoute(route)}
                  >
                    Szerkesztés
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteRoute(route.id)}
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>{editMode ? "Útvonal szerkesztése" : "Új útvonal hozzáadása"}</h2>
            <label>
              Dolgozó:
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Válassz dolgozót</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Útvonal (Indulás-Végállomás):
              <input
                type="text"
                value={routeDetails.route}
                onChange={(e) =>
                  setRouteDetails({ ...routeDetails, route: e.target.value })
                }
              />
            </label>
            <label>
              Rakomány:
              <input
                type="text"
                value={routeDetails.deliveredGoods}
                onChange={(e) =>
                  setRouteDetails({
                    ...routeDetails,
                    deliveredGoods: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Távolság:
              <input
                type="text"
                value={routeDetails.distance}
                onChange={(e) =>
                  setRouteDetails({ ...routeDetails, distance: e.target.value })
                }
              />
            </label>
            <label>
              Dátum:
              <input
                type="date"
                value={routeDetails.date}
                onChange={(e) =>
                  setRouteDetails({ ...routeDetails, date: e.target.value })
                }
              />
            </label>
            <label>
              Időtartam:
              <input
                type="text"
                value={routeDetails.duration}
                onChange={(e) =>
                  setRouteDetails({ ...routeDetails, duration: e.target.value })
                }
              />
            </label>
            <label>
              Státusz:
              <select
                value={routeDetails.status}
                onChange={(e) =>
                  setRouteDetails({ ...routeDetails, status: e.target.value })
                }
              >
                <option value="AKTIV">Aktív</option>
                <option value="TELJESITETT">Teljesített</option>
                <option value="VISSZAMONDOOTT">Visszamondott</option>
              </select>
            </label>
            <button onClick={handleSaveRoute}>
              {editMode ? "Módosítás mentése" : "Új útvonal hozzáadása"}
            </button>
            <button onClick={() => setIsPopupOpen(false)}>Bezárás</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoutes;
