// Weather App
// Created by Nocawe Qumbisa
// Date: October 2024


const apiKey = "88df1a1ddcd4c33845d4c0f75368ad5c";


const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const outputBox = document.getElementById("output");


searchBtn.addEventListener("click", getWeather);


input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const cityName = input.value.trim();

  if (cityName === "") {
    showError("Please enter a city name.");
    return;
  }

  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  
  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      
      const city = data.name;
      const country = data.sys.country;
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      
      outputBox.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <h3>${temp}°C</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
      `;
    })
    .catch(() => {
      showError("City not found. Please try again.");
    });
}

function showError(message) {
  outputBox.innerHTML = `<p>${message}</p>`;
}

