// Jelszó emlékeztető űrlap kezelése
document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Megakadályozza az alapértelmezett űrlap elküldést

    // Email cím beolvasása
    const email = document.getElementById("email").value.trim();

    // Ha az email cím ki van töltve
    if (email) {
        // Beugró üzenet a sikeres műveletről
        alert("Sikeresen elküldtük a jelszó emlékeztetőt a megadott email címre. Kérlek ellenőrizd a spam mappát is.");
        // Visszaírány az alap bejelentkező oldalra
        window.location.href = "index.html";
    } else {
        alert("Kérlek add meg az email címet!");
    }
});
