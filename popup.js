// ÎNCHIDE POP-UP-ul și pornește jocul
document.getElementById("closePopup").onclick = () => {
    document.getElementById("howToPlayPopup").classList.add("hidden");

    // Afișăm pisica lângă grid
    const catBox = document.getElementById("catBox");
    catBox.classList.remove("hidden");
    catBox.style.display = "flex";

    // Dăm foc tastaturii + activăm inputul
    document.body.classList.add("game-started");
};
