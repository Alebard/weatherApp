function setCurrentCity(cityName) {
    localStorage.setItem('currentCity', JSON.stringify(cityName))

}

function getCurrentCity() {
    return JSON.parse(localStorage.getItem('currentCity'))
}

function setFavoriteCities(locationsArr) {
    localStorage.setItem('favoriteCities', JSON.stringify(locationsArr))
}

function getFavoriteCities() {
    return JSON.parse(localStorage.getItem('favoriteCities'))
}

export default {setCurrentCity, setFavoriteCities, getFavoriteCities, getCurrentCity}