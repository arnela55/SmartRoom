const FIREBASE_URL = "https://smart-room-monitoring-d71cd-default-rtdb.europe-west1.firebasedatabase.app/room.json"; 

async function fetchData() {
  try {
    const response = await fetch(FIREBASE_URL);
    const data = await response.json();

    if (data) {
      document.getElementById("temp").textContent = data.temperature ?? "--";
      document.getElementById("hum").textContent = data.humidity ?? "--";
      document.getElementById("motion").textContent = data.motion ? "Detected" : "No motion";
      document.getElementById("light").textContent = data.dark ? "Dark" : "Bright";
      document.getElementById("ledIndicator").textContent = data.led ? "ON 💡" : "OFF ❌";
    }
  } catch (error) {
    console.log("Greška pri dohvaćanju podataka:", error);
  }
}

// Osvježava podatke svake 2 sekunde
setInterval(fetchData, 2000);
fetchData(); // odmah prva provjera