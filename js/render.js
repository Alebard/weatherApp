'use strict'

import data from './cityData.js';
import {UI} from './view.js';
import storage from "./storage.js";
import constructors from "./constructors.js";

async function cityWeather(cityName) {
    const cityWeatherData = await data.getData(cityName, 'weather')
    const cityForecastData = await data.getData(cityName, 'forecast')
    renderWeather(cityWeatherData)
    cityForecasts(cityForecastData)
}

function renderWeather(cityWeatherData) {
    changeWeatherTemperature(cityWeatherData);
    changeWeatherIcon(cityWeatherData);
    changeLocation(cityWeatherData);
    changeFeelsLike(cityWeatherData);
    changeWeatherStatus(cityWeatherData);
    changeSunrise(cityWeatherData);
    changeSunset(cityWeatherData);
}

function changeSunrise(cityWeatherData) {
    const date = timeConvert(cityWeatherData.sys.sunrise);
    UI.SUNRISE.textContent = `${date.hour}:${date.minutes}`;
}

function changeSunset(cityWeatherData) {
    const date = timeConvert(cityWeatherData.sys.sunset);
    UI.SUNSET.textContent = `${date.hour}:${date.minutes}`;
}

function changeWeatherStatus(cityWeatherData) {
    const weatherStatus = cityWeatherData.weather[0].main;
    UI.WEATHER.forEach(function (item) {
        item.textContent = weatherStatus
    })
}

function changeFeelsLike(cityWeatherData) {
    const feelsLike = Math.round(cityWeatherData.main.feels_like);
    UI.FEELS_LIKE.forEach(function (item) {
        item.textContent = `${feelsLike}°`;
    })
}

function changeWeatherTemperature(cityWeatherData) {
    const weatherTemperature = Math.round(cityWeatherData.main.temp);
    UI.TEMPERATURE.forEach(function (item) {
        item.textContent = `${weatherTemperature}°`;
    })
}

function changeWeatherIcon(cityWeatherData) {
    const weatherIconName = cityWeatherData.weather[0].icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconName}@4x.png`
    UI.ICON.forEach(function (item) {
        item.setAttribute('src', weatherIconUrl);
    })
}

function changeLocation(cityWeatherData) {
    const location = cityWeatherData.name;
    UI.LOCATION.forEach(function (item) {
        item.textContent = location;
    })
    storage.setCurrentCity(location)
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



function viewWeather(event) {
    const clickTarget = event.target
    if (clickTarget.classList.contains('list_title')) {
        const cityName = clickTarget.textContent
        cityWeather(cityName);
        storage.setCurrentCity(cityName)
    }
}

function deleteLocation(event) {
    const cityName = event.target.previousSibling.textContent
    const favouriteCities = new Set([...storage.getFavouriteCities()])
    favouriteCities.delete(cityName);
    storage.setFavouriteCities(favouriteCities)
    this.parentElement.remove();
}

function cityForecasts(cityForecastData) {
    removeForecasts();
    const forecasts = cityForecastData.list;
    forecasts.forEach(function (item) {
        const forecast = new constructors.CreateForecast(item);
        UI.FORECASTS.append(forecast);
    })
}



function removeForecasts() {
    UI.FORECASTS.innerHTML = '';
}


export default {cityWeather, deleteLocation, viewWeather, timeConvert};