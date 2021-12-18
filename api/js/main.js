import("../styles/style.css");
import { DOMSelectors } from "./dom";

DOMSelectors.form.addEventListener("submit", function () {
	const summoner = DOMSelectors.summonerName.value;
	console.log(summoner);

	async function getPuuid() {
		try {
			const result = await fetch(
				`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-56fd4772-91b5-4342-b0ed-58908a603076`
			);
			const data = await result.json();
			const puuid = Object.values(data)[2];

			async function getAccount() {
				try {
					const results2 = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-56fd4772-91b5-4342-b0ed-58908a603076`
					);
					const data2 = await results2.json();

					data2.forEach((matchID) => {
						async function getMatch() {
							try {
								const results3 = await fetch(
									`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-56fd4772-91b5-4342-b0ed-58908a603076`
								);
								const data3 = await results3.json();
								console.log(data3);
							} catch (error) {
								console.log(error);
							}
						}
						getMatch();
					});
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
