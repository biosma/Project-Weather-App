(()=>{let e,t,o,n,a,l;const c=document.querySelector(".submit"),r=document.querySelector(".search");let d=document.querySelector(".city-description"),u=document.querySelector(".unit"),s="°C";async function f(e){try{n=await e,localStorage.setItem("ciudad",`${n}`),localization=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${n}&limit=5&appid=135f8d3f1557e18e0522ff6fed224cb9`);const t=await localization.json(),o=t[0].lat,i=t[0].lon,a=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${o}&lon=${i}&exclude=minutely,hourly&appid=135f8d3f1557e18e0522ff6fed224cb9`,{mode:"cors"});l=await a.json(),console.log(l),p(l,n)}catch(e){console.log(e)}}function h(e){const t=e.split(" ");for(var o=0;o<t.length;o++)t[o]=t[o].charAt(0).toUpperCase()+t[o].slice(1);return t.join(" ")}function p(e,t){let o,n,a,l;for(d.textContent=h(t),i=0;i<7;i++)o=document.querySelector(`.weather-${i}`),o.textContent=h(e.daily[i].weather[0].description),l=document.querySelector(`.humidity-${i}`),l.textContent=`Humidity: ${e.daily[i].humidity} %`,a=document.querySelector(`.wind-${i}`),n=document.querySelector(`.feelslike-${i}`),"°C"===s?(a.textContent=`Wind: ${e.daily[i].wind_speed.toFixed(2)} Km/h`,n.textContent=`Feels Like ${Math.round(-273+e.daily[i].feels_like.morn)+s}`):(a.textContent=`${(e.daily[i].wind_speed/1.609).toFixed(2)} Mp/h`,n.textContent=`Feels Like ${Math.round(9*(e.daily[i].feels_like.morn-273.15)/5+32)+s}`)}navigator.geolocation.getCurrentPosition((function(i){e=i.coords.latitude,t=i.coords.longitude,f(async function(e,t){return o=await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${e}&lon=${t}&limit=1&appid=135f8d3f1557e18e0522ff6fed224cb9`),defaultSearch=await o.json(),defaultSearch[0].name}(e,t))}),(function(){console.log("ocurrio un error o no hay permisos para ver la ubicación"),a=localStorage.getItem("ciudad"),""!==a&&"Null"!==a&&"undefined"!==a||(a="Los Angeles"),f(a)})),r.addEventListener("change",(e=>{defaultSearch=e.target.value,f(defaultSearch)})),c.addEventListener("click",(()=>{defaultSearch=r.value,f(defaultSearch)})),u.addEventListener("click",(()=>{"°C"===s?(s="°F",u.textContent="°C"):(s="°C",u.textContent="°F"),p(l,n)}))})();