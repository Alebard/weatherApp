'use strict'

import {UI} from "./view.js";
import storage from "./storage.js";
import render from './render.js'
import favouriteCities from './favouriteCities.js'


render.cityWeather(storage.currentCity);
const cityInList = new render.FavouritesList();





UI.NAV_BTNS.forEach(function (item, index) {
    item.addEventListener('click', switchScreen(index))
})
UI.ADD_TO_FAVORITES_BTN.addEventListener('click', favouriteCities.addFavouriteCity);


function switchScreen(index) {
    return function () {
        removeClassName(UI.SCREEN, 'active-screen');
        removeClassName(UI.NAV_BTNS, 'active-btn');
        UI.SCREEN[index].classList.add('active-screen');
        UI.NAV_BTNS[index].classList.add('active-btn');
    }
}

function removeClassName(array, className) {
    array.forEach(function (item) {
        item.classList.remove(className);
    })
}

UI.FORM.addEventListener('submit', searchCity);

function searchCity() {
    const cityName = UI.INPUT.value;
    render.cityWeather(cityName);
}