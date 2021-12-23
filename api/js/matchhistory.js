import { DOMSelectors } from "./dom";

const matchHistory = JSON.parse(window.localStorage.getItem("matches"));
const picture = window.localStorage.getItem("icon");

console.log(matchHistory);

matchHistory.forEach((item) =>
  DOMSelectors.matchHistory.insertAdjacentHTML(
    "beforeend",
    `<p>${item.info.gameDuration} seconds</p>`
  )
);
DOMSelectors.matchHistory.insertAdjacentHTML(
  "beforeend",
  `<image src="${picture}"></image>`
);
