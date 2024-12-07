// Kijelentkezés funkció
document.getElementById("logout-button").addEventListener("click", function () {
    window.location.href = "index.html";
});

// Navigáció a Sofőrök oldalra
document.getElementById("drivers-button").addEventListener("click", function () {
    window.location.href = "admin_drivers.html";
});

// Navigáció az Útvonalak oldalra
document.getElementById("routes-button").addEventListener("click", function () {
    window.location.href = "admin_routes.html";
});
