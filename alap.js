const testDatabase = {
    username: "teszt",
    password: "teszt"
};

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Alapértelmezett elküldés megakadályozása

    // Felhasználónév és jelszó beolvasása
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Felhasználónév és jelszó ellenőrzése
    if (username === testDatabase.username && password === testDatabase.password) {
        // Átirányítás az admin oldalra
        window.location.href = "admin.html";
    } else {
        // Hibaüzenet megjelenítése
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
    }
});
