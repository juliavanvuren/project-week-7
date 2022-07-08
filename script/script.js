// time settings
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let days = weekDays[now.getDay()];

let current = document.querySelector("h2");
current.innerHTML = `${days}, ${hours}:${minutes}`;

// links API info to display on page
function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

// links city within API
function searchCity(city) {
  let apiKey = "c3895a10923317988546b6bf1fbc2d48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

// links form to input
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c3895a10923317988546b6bf1fbc2d48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// send form to function
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", searchCurrentLocation);

searchCity("Amsterdam");
