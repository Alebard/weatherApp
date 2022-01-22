import {UI} from "./view.js";
import storage from "./storage.js";
import render from './render.js'

UI.ADD_TO_FAVORITES_BTN.addEventListener('click', addFavouriteCity);
function addFavouriteCity() {
    const cityName = UI.LOCATION_NAME.textContent;
    const cities = new Set([...storage.getFavouriteCities()])
    cities.add(cityName);
    storage.setFavouriteCities(cities)
    render.favouritesList()
}


export default {addFavouriteCity}