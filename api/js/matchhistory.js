import { DOMSelectors } from "./dom";
import { grabIcon } from "./loadingScreen";

const matchHistory = JSON.parse(window.localStorage.getItem("matches"));
console.log(matchHistory);
matchHistory.forEach((item) =>
  DOMSelectors.matchHistory.insertAdjacentHTML(
    "beforeend",
    `<p>${item.info.gameDuration} seconds</p>`
  )
);
grabIcon.insertAdjacentHTML("beforeend", `<image>${grabIcon}</image>`);
