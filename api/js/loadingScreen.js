import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");
async function getPuuid() {
	try {
		const apiPuuid = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-ef234fe1-6737-44ee-b8b5-87cf28148811`
		).then((api) => api.json());
		const puuid = Object.values(apiPuuid)[2];
		const icon = Object.values(apiPuuid)[4];
		const level = Object.values(apiPuuid)[6];
		const name = Object.values(apiPuuid)[3];

		window.localStorage.setItem("level", level);
		window.localStorage.setItem("name", name);

		const grabIcon = `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${icon}.png`;
		window.localStorage.setItem("icon", grabIcon);

		async function getAccount() {
			try {
				const apiAccount = await fetch(
					`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=25&api_key=RGAPI-ef234fe1-6737-44ee-b8b5-87cf28148811`
				).then((api) => api.json());

				let apiMatches = [];
				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-ef234fe1-6737-44ee-b8b5-87cf28148811`
					).then((api) => api.json());
					console.log(apiMatch);
					apiMatches.push(apiMatch);
				}
				console.log("Page LOADED");
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
