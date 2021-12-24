import { DOMSelectors } from "./dom";
import("../styles/matchHistory.css");

const match = JSON.parse(window.localStorage.getItem("matches"));
console.log(match);

const picture = window.localStorage.getItem("icon");
const level = window.localStorage.getItem("level");
const name = window.localStorage.getItem("name");

DOMSelectors.summonerInfo.insertAdjacentHTML(
	"afterbegin",
	`<image src="${picture}" class="profile"></image>
	<div class="summonerInfoText">
	<h2 class="profile">${name}</h2>
	<h2 class="profile">Level ${level}</h2>
	</div>`
);

match.forEach((item) =>
	DOMSelectors.matchHistory.insertAdjacentHTML(
		"beforeend",
		`<p>${item.info.gameDuration} seconds</p>`
	)
);
