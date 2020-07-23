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
function formatForecastWeekday(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = days[date.getDay()];
  return weekDay;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentHour}:${currentMinute}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-3">
      <div class="card">
        <div class="card-body">
        <h5 class="card-title"
        id="day-of-the-week">
        ${formatTime(forecast.dt * 1000)}
        </h5>
        <img class="card-img" id="forecast-img" src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png">
        <div class="daily-forecast-temp">
        <p class="card-text " id="weeks-tempature">
          ${Math.round(forecast.main.temp)}º
        </p>
        </div>
        <p class="card-text text-wrap" id="description-of-temp">
          ${forecast.weather[0].description}
        </p>
        </div>
      </div>
    </div>
    `;
  }
}

//Api calls
function apiCalls(city) {
  let apiKey = "e225c6d111cb3447388ed224dda3872f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showRealTemp);

  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(forecastApiUrl).then(displayForecast);
}

//change city

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-city");
  apiCalls(cityElement.value);
  let input = document.querySelector("input");
  input.value = "";
}

apiCalls("San Francisco");

//replacing information

function showRealTemp(response) {
  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data.weather);
  document.querySelector("#current-weather-attributes-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  changeImage(response.data.weather[0].icon);
}

let form = document.querySelector("#search-for-city");
form.addEventListener("submit", searchCity);

//changing main icon
function changeImage(icon) {
  let iconCondition = document.querySelector("#current-weather-img");
  if (icon === "01d" || icon === "02d") {
    iconCondition.setAttribute("src", `Images/sunny_day_orange.svg`);
  } else if (icon === "03d" || icon === "04d") {
    iconCondition.setAttribute("src", `Images/Cloudy_orange.svg`);
  } else if (icon === "50d") {
    iconCondition.setAttribute("src", `Images/Windy_orange.svg`);
  } else if (icon === "09d" || icon === "09n") {
    iconCondition.setAttribute("src", `Images/Rain_orange.svg`);
  } else if (icon === "10d" || icon === "11d") {
    iconCondition.setAttribute("src", `Images/Rain_orange.svg`);
  } else if (icon === "13d") {
    iconCondition.setAttribute("src", `Images/Cold_windy_orange.svg`);
  } else {
    iconCondition.setAttribute("src", `Images/sunny_day_orange.svg`);
  }
}
// Change Fº/Cº

function convertFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("inactive");
  let currentTempature = document.querySelector("#current-temp");
  currentTempature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsius(event) {
  event.preventDefault();
  let currentTempature = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("inactive");
  let tempature = ((fahrenheitTemperature - 32) * 5) / 9;
  currentTempature.innerHTML = Math.round(tempature);
}
let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-main");
fahrenheitLink.addEventListener("click", convertFahrenheit);

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
