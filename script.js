
const apiKey = "23e0b324774474eef5a5599ff36f4f8a"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

searchBtn.addEventListener("click", getWeather);

function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherDiv.innerHTML = '<p class="error">Please enter a city name</p>';
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23e0b324774474eef5a5599ff36f4f8a&units=metric`)
    .then(response => {
      if (!response.ok){
        throw new Error("City not found");
      } 
      return response.json()
    })
    .then(data => {
      weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p class="temperature">${Math.round(data.main.temp)}°C</p>
        <div class="details">
          <p>${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} km/h</p>
        </div>
      `;
      })
    .catch(() => {
      weatherDiv.innerHTML = '<p class="error">City not found</p>';
    })
}