const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "95620bdacaa86f677c1657937565f524";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
    const res = await fetch (`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const json = await res.json();
    return json;
}

const getCurrentWeatherByCoordinates = async (lat, lon) => {
    const res = await fetch (`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const json = await res.json();
    return json;
}

const renderCurrentWeather = (data) => {
    console.log(data);
    
    const weatherJSX = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div id="main">
            <img alt="weather icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" />
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)}</p>
        </div>
        <div id="info">
            <p>Humidity: <span>${data.main.humidity} %</span></p>
            <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
        </div>
    `;

    weatherContainer.innerHTML = weatherJSX;
}

const searchHandler = async () => {
    const cityName = searchInput.value;

    if(!cityName) {
        alert("for know about the weather you must write your city name!");
    }

    const currentData = await getCurrentWeatherByName(cityName);

    renderCurrentWeather(currentData);
};

const positionCallback = async (position) => {
    const {latitude, longitude} = position.coords;
    const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
    renderCurrentWeather(currentData);
}

const errorCallback = (error) => {
    console.log(error)
}

const locationHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
    } else {
        alert("Your browser does not support geolocation!")
    }
}

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);