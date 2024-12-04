document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault();


    const email = document.getElementById("email").value.trim();


    if (email) {
        alert("Sikeresen elküldtük a jelszó emlékeztetőt a megadott email címre. Kérlek ellenőrizd a spam mappát is.");
        window.location.href = "index.html";
    } 
    else {
        alert("Kérlek add meg az email címet!");
    }
});
