import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");

async function getPuuid() {
	try {
		const apiPuuid = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-1296c926-b71e-4863-9bab-22c904a46619`
		).then(api => api.json());
		const puuid = Object.values(apiPuuid)[2];
		const icon = Object.values(apiPuuid)[4];
		const level = Object.values(apiPuuid)[6];
		const name = Object.values(apiPuuid)[3];

		window.localStorage.setItem("level", level);
		window.localStorage.setItem("name", name);

		const summonerIcon = `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${icon}.png`;
		window.localStorage.setItem("icon", summonerIcon);

		async function getAccount() {
			try {
				const apiAccount = await fetch(
					`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=25&api_key=RGAPI-1296c926-b71e-4863-9bab-22c904a46619`
				).then(api => api.json());

				let apiMatches = [];

				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-1296c926-b71e-4863-9bab-22c904a46619`
					).then(api => api.json());
					apiMatches.push(apiMatch);
				}
				window.localStorage.setItem("matches", JSON.stringify(apiMatches, null, 4));

				window.location.href = "./matchHistory.html";
			} catch (error) {
				console.log(error);
			}
		}
		getAccount();
	} catch (error) {
		console.log(error);
		window.location.href = "./error.html";
	}
}
getPuuid();
