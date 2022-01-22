import render from "./render.js";

function ForecastData(data) {
    this.date = render.timeConvert(data.dt);
    this.weatherHour = this.date.hour
    this.weatherMinutes = this.date.minutes
    this.weatherDay = this.date.day
    this.weatherMonth = this.date.month
    this.temp = Math.round(data.main.temp);
    this.feelsLike = Math.round(data.main.feels_like);
    this.weatherStatus = data.weather[0].main;
    this.weatherIcon = data.weather[0].icon;
}

export default {ForecastData}