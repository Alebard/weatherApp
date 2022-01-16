'use strict'
import urls from './urls.js'

async function getData(cityName, dataType) {
    const urlWeather = urls.getUrl(dataType, cityName)
    const urlForecast = urls.getUrl('forecast', cityName)
    const response = await fetch(urlWeather);
    const cityData = await response.json()
    return cityData
}

export default {getData}
