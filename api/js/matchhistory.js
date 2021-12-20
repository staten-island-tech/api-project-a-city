import { DOMSelectors } from "./dom";

const matchHistory = JSON.parse(window.localStorage.getItem("matches"));

console.log(matchHistory);
matchHistory.forEach((item) =>
  DOMSelectors.matchHistory.insertAdjacentHTML(
    "beforeend",
    `<p>${item.info.gameDuration} seconds</p>`
  )
);
