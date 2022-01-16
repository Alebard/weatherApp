import {UI} from "./view.js";
import storage from "./storage.js";
import constructors from "./constructors.js";

UI.ADD_TO_FAVORITES_BTN.addEventListener('click', addFavouriteCity);
function addFavouriteCity() {
    const cityName = UI.LOCATION_NAME.textContent;
    const favouriteCities = storage.getFavouriteCities()
    const citiesSet = new Set([...favouriteCities])
    citiesSet.add(cityName);
    storage.setFavouriteCities(citiesSet)
    constructors.FavouritesList()
}


export default {addFavouriteCity}