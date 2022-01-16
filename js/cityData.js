'use strict'
import urls from './urls.js'

async function getData(cityName, dataType) {
    try {
        const urlWeather = urls.getUrl(dataType, cityName)
        const response = await fetch(urlWeather);
        const cityData = await response.json()
        if (response.statusText !== "OK") {
            throw new Error("ERROR");
        }else{
        return cityData
        }
    } catch(e) {
        alert(e)
    }

}

export default {getData}
