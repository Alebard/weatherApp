import {UI} from "./view.js";
import storage from "./storage.js";
import render from "./render.js";


function addFavouriteCity() {
    const cityName = UI.LOCATION_NAME.textContent;
    const favouriteCities = storage.getFavouriteCities()
    const citiesSet = new Set([...favouriteCities])
    citiesSet.add(cityName);
    storage.setFavouriteCities(citiesSet)
    render.FavouritesList()
}


export default {addFavouriteCity}