import { DOMSelectors } from "./dom";
import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");

async function getPuuid() {
	try {
		const apiPuuid = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-6468f5ee-26e6-40c1-b48a-9a75377566bd`
		).then((api) => api.json());
		const puuid = Object.values(apiPuuid)[2];

		async function getAccount() {
			try {
				const apiAccount = await fetch(
					`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=RGAPI-6468f5ee-26e6-40c1-b48a-9a75377566bd`
				).then((api) => api.json());

				let apiMatches = [];
				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-6468f5ee-26e6-40c1-b48a-9a75377566bd`
					).then((api) => api.json());
					console.log(apiMatch);
					apiMatches.push(apiMatch);
				}
				console.log("Page LOADED");
				DOMSelectors.loadScreen.innerHTML = `<h1>Match History</h1>
		<div class="matchHistory"></div>`;
				apiMatches.forEach((id) =>
					document
						.querySelector(".matchHistory")
						.insertAdjacentHTML("beforeend", `${id}`)
				);
			} catch (error) {
				console.log(error);
			}
		}
		getAccount();
	} catch (error) {
		console.log(error);
	}
}
getPuuid();
