'use strict'

import {UI} from "./view.js";
import storage from "./storage.js";
import render from './render.js'
import favouriteCities from './favouriteCities.js'
import tabs from './tabs.js'
import constructors from "./constructors.js";


render.cityWeather(storage.getCurrentCity());
const favouritsCitiesList = new constructors.FavouritesList();

UI.ADD_TO_FAVORITES_BTN.addEventListener('click', favouriteCities.addFavouriteCity);

UI.FORM.addEventListener('submit', searchCity);

function searchCity() {
    const cityName = UI.INPUT.value;
    render.cityWeather(cityName);
}