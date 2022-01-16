'use strict'
const serverUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';


function getUrl(type,cityName) {
       return `${serverUrl}${type}?q=${cityName}&appid=${apiKey}&units=metric`
}


export default {getUrl}