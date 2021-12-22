'use strict'

import {UI} from "./view.js";
import  storage from "./storage.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const locationsArr = storage.getFavoriteCities() ? storage.getFavoriteCities() : [];
const currentCity = storage.getCurrentCity() ? storage.getCurrentCity() : [];
currentCity.length > 0 ? getData(currentCity) : getData('Dubai');

for (let i = 0; i < UI.NAV.length; i++) {
    UI.NAV[i].addEventListener('click', function () {
        switchScreen(i);
    })
}

function switchScreen(i) {
    for (screen of UI.DISPLAY) {
        screen.classList.remove('active-screen');
    }
    UI.DISPLAY[i].classList.add('active-screen');
    for (let btn of UI.NAV) {
        btn.classList.remove('active-btn');
    }
    UI.NAV[i].classList.add('active-btn');
}

UI.FORM.addEventListener('submit', getData);

function getData(city) {
    const cityIsString = typeof (city) === "string";
    let cityName = cityIsString ? city : UI.INPUT.value;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
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
        .catch(err => alert(err))
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
    const sunriseTime = result.sys.sunrise;
    UI.SUNRISE.textContent = sunriseTime;
}
function changeSunset(result) {
    const sunsetTime = result.sys.sunset;
    UI.SUNSET.textContent = sunsetTime;
}

function changeWeatherStatus(result)     {
    const weatherStatus = result.weather[0].main;
    for (let item of UI.WEATHER) {
        item.textContent = weatherStatus
    }
}


function changeFeelsLike(result) {
    const feelsLike = Math.round(result.main.feels_like);
    for (let item of UI.FEELS_LIKE) {
        item.textContent = `${feelsLike}°`;
    }
}

function changeWeatherTemperature(result) {
    const weatherTemperature = Math.round(result.main.temp);
    for (let item of UI.TEMPERATURE) {
        item.textContent = `${weatherTemperature}°`;
    }
}

function changeWeatherIcon(result) {
    const weatherIconName = result.weather[0].icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconName}@4x.png`
    for (let item of UI.ICON) {
        item.setAttribute('src', weatherIconUrl);
    }
}

function changeLocation(result) {
    const location = result.name;
    for (let item of UI.LOCATION) {
        item.textContent = location;
    }
    storage.setCurrentCity(location)
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
    if (!locationsArr.includes(location)){
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
    storage.setFavoriteCities()
}



function addFavoriteCitiesFromStorage() {
    locationsArr.forEach(function (item) {
            addToFavorites(item)
    })

}


addFavoriteCitiesFromStorage()
