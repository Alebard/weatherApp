import {UI} from "./view.js";
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';


for (let i = 0; i < UI.NAV.length; i++) {
    UI.NAV[i].addEventListener('click', function () {
        switchScreen(i);
    })
}

function switchScreen(i) {
    for (screen of UI.DISPLAY) {
        screen.classList.remove('active-screen');
    }
    UI.DISPLAY[i].classList.add('active-screen');
    for (btn of UI.NAV) {
        btn.classList.remove('active-btn');
    }
    UI.NAV[i].classList.add('active-btn');
}

UI.FORM.addEventListener('submit', event => {
    const cityName = UI.INPUT.value;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error;
            }
        })
        .then(result=> {
            changeWeatherTemperature(result);
            changeWeatherIcon(result);
            changeLocation(result);
        })
        .catch(err => alert(err))
})
function changeWeatherTemperature(result) {
    const weatherTemperature = Math.round(result.main.temp);
    for (let item of UI.TEMPERATURE){
        item.textContent = `${weatherTemperature}°`;
    }
}

function changeWeatherIcon(result){
    const weatherIconName = result.weather[0].icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconName}@4x.png`
    for (let item of UI.ICON){
        item.setAttribute('src', weatherIconUrl);
    }
}

function changeLocation(result) {
    const location = result.name;
    for (let item of UI.LOCATION){
        item.textContent = location;
    }
}