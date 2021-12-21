'use strict'

export const UI = {
    NAV: document.getElementsByClassName('nav_btn'),
    DISPLAY: document.getElementsByClassName('weather_info_item'),
    INPUT: document.querySelector('input'),
    FORM: document.querySelector('form'),
    TEMPERATURE: document.getElementsByClassName('weather_temp'),
    FEELS_LIKE: document.getElementsByClassName('parameters_feels-like'),
    ICON: document.getElementsByClassName('weather_icon'),
    LOCATION: document.getElementsByClassName('location'),
    ADD_TO_FAVORITES: document.getElementById('add-to-favorites'),
    LOCATIONS_LIST: document.getElementsByClassName('list_item'),
    WEATHER: document.getElementsByClassName('parameters_weather'),
    SUNRISE: document.getElementById('parameters_sunrise'),
    SUNSET: document.getElementById('parameters_sunset'),
}
