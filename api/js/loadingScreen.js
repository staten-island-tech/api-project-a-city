import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");
async function getPuuid() {
	try {
		const apiPuuid = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-ea07fd1f-ddfc-4538-a971-1df4a679d74b`
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
					`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=RGAPI-ea07fd1f-ddfc-4538-a971-1df4a679d74b`
				).then((api) => api.json());

				let apiMatches = [];

				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-ea07fd1f-ddfc-4538-a971-1df4a679d74b`
					).then((api) => api.json());
					apiMatches.push(apiMatch);
				}

				const match = JSON.parse(JSON.stringify(apiMatches, null, 4));

				match.forEach(function (item) {
					const info = item.info;
					const metaData = info.participants.filter((summoner) => summoner.summonerName === name)[0];

					async function getSpell() {
						const spellJson = await fetch("http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json")
							.then((response) => response.json())
							.then((spell) => Object.values(spell.data));

						const findspell1 = spellJson.filter((spell) => spell.key == metaData.summoner1Id);
						const spell1 = findspell1[0].id;
						console.log(spell1);

						const findspell2 = spellJson.filter((spell) => spell.key == metaData.summoner2Id);
						const spell2 = findspell2[0].id;
						console.log(spell2);
					}
					getSpell();

					async function getRune() {
						const runeJson = await fetch("http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json").then((response) => response.json());

						const rune1Type = runeJson.filter((rune) => rune.id == metaData.perks.styles[0].style)[0];
						const filterRune1 = rune1Type.slots[0].runes;

						const rune2Type = runeJson.filter((rune) => rune.id == metaData.perks.styles[1].style)[0];
						const filterRune2 = rune2Type.icon;
						console.log(filterRune2);

						const getRune1 = filterRune1.filter((rune) => rune.id == metaData.perks.styles[0].selections[0].perk)[0].icon;
						console.log(getRune1);
					}
					getRune();
				});

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
