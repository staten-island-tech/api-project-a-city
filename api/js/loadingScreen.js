import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");

async function getPuuid() {
	try {
		const checkPromise = new Promise(function (resolve, reject) {
			const apiPuuid = await fetch(
				`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-0c154a56-dc27-47c8-a57c-776915c7efae`
			).then((api) => api.json());

			resolve();
			reject();
		});

		checkPromise.then(
			function (value) {},
			function (error) {}
		);

		const puuid = Object.values(apiPuuid)[2];
		const icon = Object.values(apiPuuid)[4];

		async function grabIcon() {
			const icons = await fetch(
				`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${icon}.png`
			).then((icon) => icon.json());
			window.localStorage.setItem("icons", JSON.stringify(icons, null, 4));
		}
		async function getAccount() {
			try {
				const apiAccount = await fetch(
					`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-0c154a56-dc27-47c8-a57c-776915c7efae`
				).then((api) => api.json());

				let apiMatches = [];
				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-0c154a56-dc27-47c8-a57c-776915c7efae`
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
		grabIcon();
	} catch (error) {
		console.log(error);
	}
}
getPuuid();
