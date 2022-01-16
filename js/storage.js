'use strict'

function setCurrentCity(cityName) {
    localStorage.setItem('currentCity', JSON.stringify(cityName))

}

function getCurrentCity() {
    return JSON.parse(localStorage.getItem('currentCity'))
}

function setFavouriteCities(favouriteCitesNames) {
    localStorage.setItem('favouriteCities', JSON.stringify([...favouriteCitesNames]))
}

function getFavouriteCities() {
    const jsonFavouriteCities = JSON.parse(localStorage.getItem('favouriteCities'))
    const favouriteCities = jsonFavouriteCities? jsonFavouriteCities : [];
    return favouriteCities;
}


const defaultCityName = 'Dubai';
const currentCity = getCurrentCity() ? getCurrentCity() : defaultCityName;

export default {setCurrentCity, setFavouriteCities, getFavouriteCities, currentCity}