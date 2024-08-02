const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "95620bdacaa86f677c1657937565f524";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

const getCurrentWeatherByName = async (city) => {

    const res = await fetch (`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const json = await res.json();
    return json;
    
}



const searchHandler = async () => {
    const cityName = searchInput.value;

    if(!cityName) {
        alert("for know about the weather you must write your city name!");
    }

    const currentData = await getCurrentWeatherByName(cityName);

    console.log(currentData)
}

searchButton.addEventListener("click", searchHandler);

// const BASE_URL = "https://api.openweathermap.org/data/2.5";
// const API_KEY = "95620bdacaa86f677c1657937565f524";

// const searchInput = document.querySelector("input");
// const searchButton = document.querySelector("button");


// const clickHandler = () => {

//     const cityName = searchInput.value;

//     if (!cityName) {
//         alert("Please Enter valid data!")
//     }

//     const getCurrentData = async (cityName) => {
//         const response = await fetch(`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
//         const json = await response.json();
//         console.log(json) 
//     }

//     getCurrentData();

// }

// searchButton.addEventListener("click", clickHandler);
