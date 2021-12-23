import { DOMSelectors } from "./dom";

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

matchHistory.forEach((item) =>
	DOMSelectors.matchHistory.insertAdjacentHTML(
		"beforeend",
		`<p>${item.info.gameDuration} seconds</p>`
	)
);
