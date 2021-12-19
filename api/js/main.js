import("../styles/style.css");
import { DOMSelectors } from "./dom";

DOMSelectors.form.addEventListener("submit", function (e) {
	e.preventDefault();
	const summoner = DOMSelectors.summonerName.value;

	async function getData() {
		async function getPuuid() {
			try {
				const apiPuuid = await fetch(
					`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-56fd4772-91b5-4342-b0ed-58908a603076`
				).then((api) => api.json());
				const puuid = Object.values(apiPuuid)[2];

				async function getAccount() {
					try {
						const apiAccount = await fetch(
							`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=2&api_key=RGAPI-56fd4772-91b5-4342-b0ed-58908a603076`
						).then((api) => api.json());

						for (const matchID of apiAccount) {
							const apiMatch = await fetch(
								`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-56fd4772-91b5-4342-b0ed-58908a603076`
							).then((api) => api.json());
							console.log(await apiMatch);
						}
					} catch (error) {
						console.log(error);
					}
				}
				await getAccount();
			} catch (error) {
				console.log(error);
			}
		}
		await getPuuid();
	}
	getData();
});
