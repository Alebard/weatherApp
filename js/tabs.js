'use strict'
import {UI} from "./view.js";

UI.NAV_BTNS.forEach(function (item, index) {
    item.addEventListener('click', switchScreen(index))
})

function switchScreen(index) {
    return function () {
        removeClassName(UI.SCREEN, 'active-screen');
        removeClassName(UI.NAV_BTNS, 'active-btn');
        UI.SCREEN[index].classList.add('active-screen');
        UI.NAV_BTNS[index].classList.add('active-btn');
    }
}

function removeClassName(array, className) {
    array.forEach(function (item) {
        item.classList.remove(className);
    })
}

export default {switchScreen}