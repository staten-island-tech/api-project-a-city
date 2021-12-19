import("../styles/style.css");
import { DOMSelectors } from "./dom";

DOMSelectors.form.addEventListener("submit", function (e) {
	e.preventDefault();
	const summoner = DOMSelectors.summonerName.value;

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

					for (const matchID of apiAccount) {
						const apiMatch = await fetch(
							`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-6468f5ee-26e6-40c1-b48a-9a75377566bd`
						).then((api) => api.json());
						console.log(Object.entries(apiMatch));
					}
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
});
