import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");

async function getPuuid() {
	try {
		const getIgn = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-0d966c91-f3e4-4aa6-bd27-00b3d8c2861b`
		);
		const apiPuuid = await getIgn.json();

		const puuid = Object.values(apiPuuid)[2];
		const icon = Object.values(apiPuuid)[4];

		window.localStorage.setItem("icon", icon);

		async function getAccount() {
			try {
				const apiAccount = await fetch(
					`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-0d966c91-f3e4-4aa6-bd27-00b3d8c2861b`
				).then((api) => api.json());

				let apiMatches = [];
				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-0d966c91-f3e4-4aa6-bd27-00b3d8c2861b`
					).then((api) => api.json());
					console.log(apiMatch);
					apiMatches.push(apiMatch);
				}
				console.log("Page LOADED");
				window.localStorage.setItem(
					"matches",
					JSON.stringify(apiMatches, null, 4)
				);
				window.location.href = "./matchHistory.html";
			} catch (error) {
				console.log(error);
			}
		}
		getAccount();
	} catch (error) {
		//window.location.href = "./error.html";
		console.log("Not valid summonor name");
		console.log(error);
	}
}
getPuuid();
