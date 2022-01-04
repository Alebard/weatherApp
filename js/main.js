'use strict'

import {UI} from "./view.js";
import storage from "./storage.js";

const serverWeatherData = 'https://api.openweathermap.org/data/2.5/weather';
const serverForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

const locationsArr = storage.getFavoriteCities() ? storage.getFavoriteCities() : [];
const currentCity = storage.getCurrentCity() ? storage.getCurrentCity() : [];

currentCity.length > 0 ? getData(currentCity) : getData('Dubai');


UI.NAV_BTNS.forEach(function (item, index) {
    item.addEventListener('click', switchScreen(index))
})

function switchScreen(index) {
    return function () {
        removeClassName(UI.DISPLAY, 'active-screen');
        removeClassName(UI.NAV_BTNS, 'active-btn');
        UI.DISPLAY[index].classList.add('active-screen');
        UI.NAV_BTNS[index].classList.add('active-btn');
    }
}

function removeClassName (array, className){
   array.forEach(function (item) {
        item.classList.remove(className);
    })
}

UI.FORM.addEventListener('submit', getData);

function getData(city) {
    const isCityTypeString = (typeof (city) === "string");
    const cityName = isCityTypeString ? city : UI.INPUT.value;
    const url = `${serverWeatherData}?q=${cityName}&appid=${apiKey}&units=metric`;
    const urlForecast = `${serverForecastUrl}?q=${cityName}&appid=${apiKey}&units=metric`
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error;
            }
        })
        .then(result => {
            changeView(result)

        })
        .catch(alert)

    fetch(urlForecast)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error;
            }
        })
        .then(result => {
            addForecasts(result)
        })
        .catch(alert)
}

function changeView(result) {
    changeWeatherTemperature(result);
    changeWeatherIcon(result);
    changeLocation(result);
    changeFeelsLike(result);
    changeWeatherStatus(result);
    changeSunrise(result);
    changeSunset(result);
}

function changeSunrise(result) {
    const date = timeConvert(result.sys.sunrise);
    UI.SUNRISE.textContent = `${date.hour}:${date.minutes}`;
}

function changeSunset(result) {
    const date = timeConvert(result.sys.sunset);
    UI.SUNSET.textContent = `${date.hour}:${date.minutes}`;
}

function changeWeatherStatus(result) {
    const weatherStatus = result.weather[0].main;
    UI.WEATHER.forEach(function (item) {
        item.textContent = weatherStatus
    })
}

function changeFeelsLike(result) {
    const feelsLike = Math.round(result.main.feels_like);
    UI.FEELS_LIKE.forEach(function (item) {
        item.textContent = `${feelsLike}°`;
    })
}

function changeWeatherTemperature(result) {
    const weatherTemperature = Math.round(result.main.temp);
    UI.TEMPERATURE.forEach(function (item) {
        item.textContent = `${weatherTemperature}°`;
    })
}

function changeWeatherIcon(result) {
    const weatherIconName = result.weather[0].icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconName}@4x.png`
    UI.ICON.forEach(function (item) {
        item.setAttribute('src', weatherIconUrl);
    })
}

function changeLocation(result) {
    const location = result.name;
    UI.LOCATION.forEach(function (item) {
        item.textContent = location;
    })
    storage.setCurrentCity(location)
}


function createForecast(item) {
    const date = timeConvert(item.dt);
    const weatherHour = date.hour
    const weatherMinutes = date.minutes
    const weatherDay = date.day
    const weatherMonth = date.month
    const temp = Math.round(item.main.temp);
    const feelsLike = Math.round(item.main.feels_like);
    const weatherStatus = item.weather[0].main;
    const weatherIcon = item.weather[0].icon;
    const forecast = document.createElement('div');
    forecast.className = 'forecast_item';
    forecast.innerHTML = `<div class="forecast_date-and-time"> 
            <div class="forecast_date">${weatherDay} ${weatherMonth}</div> 
            <div class="forecast_time">${weatherHour}:${weatherMinutes}</div> 
        </div> 
        <div class="forecast_info"> 
            <div class="forecast_param">
                <div>Temperature: <span class="weather_temp parameters_temp">${temp}°</span></div>
                <div>Feels like: <span class="parameters_feels-like">${feelsLike}°</span></div>
            </div>
            <div class="forecast_status">   
                <span class="parameters_weather">${weatherStatus}</span>
                <div class="weather_img forecast_weather__image" style="background-image: url(https://openweathermap.org/img/wn/${weatherIcon}@4x.png)"></div>
            </div>
        </div>`
    return forecast
}

UI.ADD_TO_FAVORITES.addEventListener('click', addToFavoritesFromNow);

function addToFavoritesFromNow() {
    let location = locationName.textContent;
    let thisLocationHasList = locationsArr.includes(location);
    if (thisLocationHasList) {
        alert('This city is on the list')
        return
    }
    addToFavorites(location);
}

function addToFavorites(location) {
    let newLocation = document.createElement('div');
    newLocation.className = 'list_item';
    newLocation.innerHTML = `<span class="list_title">${location}</span>`;
    let closeLocation = document.createElement('span');
    closeLocation.className = 'list_close'
    closeLocation.innerHTML = '&#10006';
    list_items.append(newLocation);
    newLocation.append(closeLocation)
    if (!locationsArr.includes(location)) {
        locationsArr.push(location)
    }
    UI.FORM.reset();
    newLocation.addEventListener('click', viewWeather)
    closeLocation.addEventListener('click', deleteLocation)
    storage.setFavoriteCities(locationsArr)
}

function viewWeather(event) {
    const clickTarget = event.target
    if (clickTarget.classList.contains('list_title')) {
        const cityName = clickTarget.textContent
        getData(cityName);
        storage.setCurrentCity(cityName)
    }
}

function deleteLocation(location) {
    const index = locationsArr.indexOf(location);
    locationsArr.splice(index, 1);
    this.parentElement.remove();
    storage.setFavoriteCities(locationsArr)
}

function addFavoriteCitiesFromStorage() {
    locationsArr.forEach(function (item) {
        addToFavorites(item)
    })

}

function timeConvert(unixTime) {
    const date = new Date(unixTime * 1000)
    const dateParametrs = {
        day: date.toLocaleString('en-US', {day: "numeric"}),
        month: date.toLocaleString('en-US', {month: "short"}),
        hour: dateLengthCheck(date.getHours()),
        minutes: dateLengthCheck(date.getMinutes()),
    }
    return dateParametrs
}

function dateLengthCheck(checkDate) {
    let date;
    (checkDate < 10) ? date = `0${checkDate}` : date = checkDate;
    return date
}

function addForecasts(result) {
    removeForecasts();
    const forecasts = result.list;
    forecasts.forEach(function (item) {
        const forecast = createForecast(item);
        UI.FORECASTS.append(forecast);
    })
}

function removeForecasts(){
    UI.FORECASTS.innerHTML = '';
}

addFavoriteCitiesFromStorage();