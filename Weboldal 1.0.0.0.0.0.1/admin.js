document.addEventListener('DOMContentLoaded', function() {
  // Az admin oldal betöltődése után fut le
  
  // Felhasználók kezelése
  const userList = document.getElementById('user-list');
  
  // Route kezelése
  const routeList = document.getElementById('route-list');
  
  // Riportok generálása
  const reportSection = document.getElementById('report-section');
  
  // Adatok szimulálása (ha API-t használsz, akkor itt API hívások történnek)
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', status: 'inactive' },
  ];
  
  const routes = [
    { id: 1, start: 'Budapest', end: 'Debrecen', distance: 250, duration: 3, consumption: 10 },
    { id: 2, start: 'Budapest', end: 'Pécs', distance: 180, duration: 2.5, consumption: 8 },
  ];
  
  // Felhasználók listázása
  function renderUserList() {
    userList.innerHTML = ''; // Előző lista törlése
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.classList.add('user-item');
      userElement.innerHTML = `
        <div><strong>${user.name}</strong> (${user.email})</div>
        <div>Status: ${user.status}</div>
        <button onclick="deleteUser(${user.id})">Delete</button>
        <button onclick="toggleUserStatus(${user.id})">Toggle Status</button>
      `;
      userList.appendChild(userElement);
    });
  }
  
  // Felhasználó törlése
  function deleteUser(userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
      users.splice(index, 1); // Törlés a tömbből
      renderUserList(); // Újrarendereljük a listát
    }
  }
  
  // Felhasználó státuszának váltása (aktív/inaktív)
  function toggleUserStatus(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
      user.status = user.status === 'active' ? 'inactive' : 'active';
      renderUserList(); // Újrarendereljük a listát
    }
  }
  
  // Route lista renderelése
  function renderRouteList() {
    routeList.innerHTML = ''; // Előző lista törlése
    routes.forEach(route => {
      const routeElement = document.createElement('div');
      routeElement.classList.add('route-item');
      routeElement.innerHTML = `
        <div><strong>${route.start} → ${route.end}</strong></div>
        <div>Distance: ${route.distance} km</div>
        <div>Duration: ${route.duration} hours</div>
        <div>Consumption: ${route.consumption} L</div>
        <button onclick="editRoute(${route.id})">Edit</button>
        <button onclick="deleteRoute(${route.id})">Delete</button>
      `;
      routeList.appendChild(routeElement);
    });
  }
  
  // Route törlése
  function deleteRoute(routeId) {
    const index = routes.findIndex(route => route.id === routeId);
    if (index !== -1) {
      routes.splice(index, 1); // Törlés a tömbből
      renderRouteList(); // Újrarendereljük a listát
    }
  }
  
  // Route szerkesztése (például form megjelenítése)
  function editRoute(routeId) {
    const route = routes.find(route => route.id === routeId);
    if (route) {
      alert(`Edit route: ${route.start} → ${route.end}`);
      // Itt valóságban formot mutathatnánk, ahol az admin módosíthatja az út adatokat
    }
  }
  
  // Riportok generálása
  function generateReports() {
    const totalDistance = routes.reduce((total, route) => total + route.distance, 0);
    const totalDuration = routes.reduce((total, route) => total + route.duration, 0);
    const totalConsumption = routes.reduce((total, route) => total + route.consumption, 0);
    
    reportSection.innerHTML = `
      <h3>Summary Report</h3>
      <p>Total Distance: ${totalDistance} km</p>
      <p>Total Duration: ${totalDuration} hours</p>
      <p>Total Consumption: ${totalConsumption} L</p>
    `;
  }
  
  // Initial render
  renderUserList();
  renderRouteList();
  
  // Report generálása gomb
  document.getElementById('generate-report-btn').addEventListener('click', generateReports);
});
