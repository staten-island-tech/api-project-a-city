import { DOMSelectors } from "./dom";
import("../styles/matchHistory.css");

const matchHistory = JSON.parse(window.localStorage.getItem("matches"));
const summonerIcon = window.localStorage.getItem("icon");

console.log(matchHistory);
console.log(summonerIcon);

DOMSelectors.matchHistory.insertAdjacentHTML(
	"afterbegin",
	`<div>
			<img src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${summonerIcon}.png" alt="Summonor icon">
		</div>`
);

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
