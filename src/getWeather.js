let latitude
let longitude
let city
let cityName
let weatherData
async function getCity(lat, long){
    city = await fetch (`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=135f8d3f1557e18e0522ff6fed224cb9`);
    defaultSearch = await city.json();
    return defaultSearch[0].name;
}

async function getsWeather(search){
    try {
        cityName = await search
        localization = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=135f8d3f1557e18e0522ff6fed224cb9`);
        const localizationData = await localization.json();
        const localizationLat = localizationData[0].lat;
        const localizationLon = localizationData[0].lon;
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${localizationLat}&lon=${localizationLon}&appid=135f8d3f1557e18e0522ff6fed224cb9`, {mode: 'cors'})
        weatherData = await response.json();
        console.log(weatherData);
        dataTreatment(weatherData);
        //console.log(localizationData[0].lat);
        //console.log(localizationData[0].lon)
    }catch(err){
        console.log(err);
    }
  };

function capitalize(str){
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ");
    return str2

}
function dataTreatment(data){
    if(unit === "°C"){
        windDescription.textContent = data.wind.speed.toFixed(2) + " Km/h";
        feelslikeDesc.textContent = "Feels Like " + Math.round(-273 + data.main.feels_like)+ unit;
    }else{
        windDescription.textContent = (data.wind.speed/1.609).toFixed(2) + " Mp/h";
        feelslikeDesc.textContent = "Feels Like " + Math.round((data.main.feels_like - 273.15) * 9/5 + 32) + unit;
    }
    weatherDescription.textContent = capitalize(data.weather[0].description);
    humidityDescription.textContent = "Humidity: " + data.main.humidity + "%";
}
