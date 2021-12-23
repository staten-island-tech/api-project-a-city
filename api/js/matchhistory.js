import { DOMSelectors } from "./dom";
import("../styles/matchHistory.css");

const matchHistory = JSON.parse(window.localStorage.getItem("matches"));
const picture = window.localStorage.getItem("icon");
const level = window.localStorage.getItem("level");
const name = window.localStorage.getItem("name");
console.log(name);

DOMSelectors.matchHistory.insertAdjacentHTML(
  "beforeend",
  `<image src="${picture}" class="player"></image>
  <h2 class="player">Summoner Name: ${name}</h2>
  <h2 class="player">Champion Level: ${level}</h2>
  <h2>Match Duration (in seconds):</h2>`
);

matchHistory.forEach((item) =>
  DOMSelectors.matchHistory.insertAdjacentHTML(
    "beforeend",

    `<p>${item.info.gameDuration} seconds</p>`
  )
);
