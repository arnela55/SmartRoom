import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase config (SAMO root URL – ne stavljati .json)
const firebaseConfig = {
  databaseURL: "https://smart-room-monitoring-d71cd-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referenca na "room" podatke
const roomRef = ref(db, "room");

// HTML elementi
const tempEl = document.getElementById("temp");
const humEl = document.getElementById("hum");
const motionEl = document.getElementById("motion");
const lightEl = document.getElementById("light");
const ledEl = document.getElementById("ledIndicator");

// Listen real-time
onValue(roomRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  // Temperature & Humidity
  tempEl.textContent = `${data.temperature ?? "--"} °C`;
  humEl.textContent = `${data.humidity ?? "--"} %`;

  // Motion
  motionEl.textContent = data.motion ? "Detected" : "No motion";
  motionEl.className = "status";

  // Light
  lightEl.textContent = data.dark ? "Dark" : "Bright";
  lightEl.className = "status";

  // LED
  ledEl.className = data.led ? "led-on" : "led-off";
});