let latitude
let longitude
let city
let cityName = "Los Angeles"
let cityCache
let weatherData
const searchCity = document.querySelector(".submit");
const inputCity = document.querySelector(".search");
let cityDescription = document.querySelector(".city-description");
let unitButton = document.querySelector(".unit");
let unit = "°C";

if(cityCache ===""){
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        cityCache = getCity(latitude, longitude);
        localStorage.setItem('ciudad',`${cityCache}`);
        getsWeather(getCity(latitude, longitude));
    })
}else{
    let cityCached = localStorage.getItem('ciudad');
    getsWeather(cityCached);//Esta bien llamar a la api porque si trataramos los datos en cache, siempre serian los mismos datos.
}

inputCity.addEventListener("change", (e) => {
    defaultSearch = e.target.value;
    getsWeather(defaultSearch);
})
searchCity.addEventListener("click", () => {
    defaultSearch = inputCity.value;
    getsWeather(defaultSearch);
})
unitButton.addEventListener("click", () => {
    if(unit === "°C"){
        unit = "°F";
        unitButton.textContent = "°C"
    }else{
        unit = "°C";
        unitButton.textContent = "°F"
    }
    dataTreatment(weatherData, cityName);
})
async function getCity(lat, long){
    city = await fetch (`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=135f8d3f1557e18e0522ff6fed224cb9`);
    defaultSearch = await city.json();
    return defaultSearch[0].name;
}

async function getsWeather(search){
    try {
        cityName = await search //Paso un search y no las lat y long del navigator por si alguien usa el input.
        localStorage.setItem('ciudad',`${cityName}`)// se sobrescribe el cache cada vez que se consulta.
        localization = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=135f8d3f1557e18e0522ff6fed224cb9`);
        const localizationData = await localization.json();
        const localizationLat = localizationData[0].lat;
        const localizationLon = localizationData[0].lon;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${localizationLat}&lon=${localizationLon}&exclude=minutely,hourly&appid=135f8d3f1557e18e0522ff6fed224cb9`, {mode: 'cors'})
        weatherData = await response.json();//para los 7 proximos dias usar la onecall api y para debugear console.log(weatherData.daily)
        console.log(weatherData);
        dataTreatment(weatherData, cityName);
    }catch(err){
        console.log(err);
    }
}
function capitalize(str){
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ");
    return str2

}
function dataTreatment(data, cityDesc){
    let weatherDos
    let feelsLikeDos
    let windDos
    let humidityDos
    cityDescription.textContent = capitalize(cityDesc) //Hay que ver si cuando no hay cache no tira error, pues cityName esta vacia
    for(i = 0; i < 7; i++){
        weatherDos = document.querySelector(`.weather-${i}`);
        weatherDos.textContent = capitalize(data.daily[(i)].weather[0].description);
        humidityDos = document.querySelector(`.humidity-${i}`);
        humidityDos.textContent = "Humidity: " + data.daily[(i)].humidity +"%";
        windDos = document.querySelector(`.wind-${i}`);
        feelsLikeDos = document.querySelector(`.feelslike-${i}`);
        if(unit === "°C"){
            windDos.textContent = "Wind: " + data.daily[(i)].wind_speed.toFixed(2) + " Km/h";
            feelsLikeDos.textContent = "Feels Like " + Math.round(-273 + data.daily[(i)].feels_like.morn) + unit;
        }else{
            windDos.textContent = (data.daily[(i)].wind_speed/1.609).toFixed(2) + " Mp/h";
            feelsLikeDos.textContent = "Feels Like " + Math.round((data.daily[(i)].feels_like.morn - 273.15) * 9/5 + 32) + unit;
        }
    }
}