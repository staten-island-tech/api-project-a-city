import { DOMSelectors } from "./dom";
import { insert_match } from "./function";
import("../styles/matchHistory.css");

const match = JSON.parse(window.localStorage.getItem("matches"));

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

match.forEach(function (item) {
	const info = item.info;
	const metaData = info.participants.filter((summoner) => summoner.summonerName === name)[0];

	console.log(metaData);

	DOMSelectors.matchHistory.insertAdjacentHTML("beforeend", insert_match(info, metaData));
});
