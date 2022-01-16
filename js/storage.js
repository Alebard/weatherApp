'use strict'

function setCurrentCity(cityName) {
    localStorage.setItem('currentCity', JSON.stringify(cityName))

}

function getCurrentCity() {
    const jsonCurrentCity = JSON.parse(localStorage.getItem('currentCity'));
    const currentCity = jsonCurrentCity? jsonCurrentCity: 'Dubai';
    return currentCity
}

function setFavouriteCities(favouriteCitesNames) {
    localStorage.setItem('favouriteCities', JSON.stringify([...favouriteCitesNames]))
}

function getFavouriteCities() {
    const jsonFavouriteCities = JSON.parse(localStorage.getItem('favouriteCities'))
    const favouriteCities = jsonFavouriteCities? jsonFavouriteCities : [];
    return favouriteCities;
}



export default {setCurrentCity, setFavouriteCities, getFavouriteCities, getCurrentCity}