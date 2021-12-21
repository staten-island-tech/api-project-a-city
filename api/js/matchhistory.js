import { DOMSelectors } from "./dom";

const matchHistory = JSON.parse(window.localStorage.getItem("matches"));
const icons = JSON.parse(window.localStorage.getItem("icons"));
console.log(icons);
console.log(matchHistory);
matchHistory.forEach((item) =>
  DOMSelectors.matchHistory.insertAdjacentHTML(
    "beforeend",
    `<p>${item.info.gameDuration} seconds</p>`
  )
);
