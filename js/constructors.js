import storage from "./storage.js";
import {UI} from "./view.js";
import render from "./render.js";

function FavouritesList() {
    UI.LOCATIONS_LIST.innerHTML = '';
    const favouriteCities = storage.getFavouriteCities()
    favouriteCities.forEach((item) => {
        let newLocation = document.createElement('div');
        newLocation.className = 'list_item';
        newLocation.innerHTML = `<span class="list_title">${item}</span>`;
        let closeLocation = document.createElement('span');
        closeLocation.className = 'list_close'
        closeLocation.innerHTML = '&#10006';
        list_items.append(newLocation);
        newLocation.append(closeLocation)
        UI.FORM.reset();
        newLocation.addEventListener('click', render.viewWeather)
        closeLocation.addEventListener('click', render.deleteLocation)
    })
}

function CreateForecast(item) {
    const date = render.timeConvert(item.dt);
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




export default {FavouritesList, CreateForecast}