//change date

let now = new Date();
let p = document.querySelector("#todays-date");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

p.innerHTML = `${day} ${month} ${date}, ${year}, ${hour}:${minutes}`;

//forcast

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
let forecast = response.data.list[0]
forecastElement.innerHTML = 
`
<h5 class="card-title" 
            id="day-of-the-week">
            Tue
            </h5>
            <img class="card-img" src="Images/sun.svg" alt="sunny">
            <p class="card-text " id="weeks-tempature">
              $[forecast.main.temp]
            </p>
            <p class="card-text text-wrap" id="description-of-temp">
              sunny skies
            </p>
`;

//change city / Api

function searchCity(event) {
  event.preventDefault();

  let city = document.querySelector("#search-city").value;
  let apiKey = "e225c6d111cb3447388ed224dda3872f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(forecastApiUrl).then(displayForecast);

  axios.get(apiUrl).then(showRealTemp);
}

//Api

function showRealTemp(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-weather-attributes-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

let form = document.querySelector("#search-for-city");
form.addEventListener("submit", searchCity);

// Change Fº/Cº

function convertFahrrenheit(event) {
  event.preventDefault();
  let currentTempature = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");

  let tempature = currentTempature.innerHTML;
  tempature = Number(tempature);
  currentTempature.innerHTML = Math.round((tempature * 9) / 5 + 32);
}

function convertCelsius(event) {
  event.preventDefault();
  let currentTempature = document.querySelector("#current-temp");
  let tempature = currentTempature.innerHTML;
  tempature = Number(tempature);
  currentTempature.innerHTML = Math.round(((tempature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-main");
fahrenheitLink.addEventListener("click", convertFahrrenheit);

let celsiusLink = document.querySelector("#celsius-main");
celsiusLink.addEventListener("click", convertCelsius);

//current location

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e225c6d111cb3447388ed224dda3872f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showRealTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getCurrentLocation);