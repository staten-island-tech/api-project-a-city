import { DOMSelectors } from "./dom";
import("../styles/matchHistory.css");

export const match = JSON.parse(window.localStorage.getItem("matches"));

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

function fancyTimeFormat(duration) {
	// Hours, minutes and seconds
	var hrs = ~~(duration / 3600);
	var mins = ~~((duration % 3600) / 60);
	var secs = ~~duration % 60;

	// Output like "1:01" or "4:03:59" or "123:03:59"
	var ret = "";

	if (hrs > 0) {
		ret += "" + hrs + "hr " + (mins < 10 ? "0" : "");
	}
	if (mins > 0) {
		ret += "" + mins + "min " + (secs < 10 ? "0" : "");
		ret += "" + secs + "sec";
	} else {
		ret += "" + secs + "sec";
	}

	return ret;
}

function insert_img(items) {
	let inner = "";
	items.forEach(function (item) {
		if (item != 0) {
			inner += `<img class="items" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${item}.png">`;
		}
	});
	return inner;
}

function insert_combos(combos) {
	let inner = "";

	if (combos[3] != 0) {
		inner += `<p class="matchHistoryDataSetBotCombosKillsType">Pentakill</p>`;
	} else if (combos[2] != 0) {
		inner += `<p class="matchHistoryDataSetBotCombosKillsType">Quadrakill</p>`;
	} else if (combos[1] != 0) {
		inner += `<p class="matchHistoryDataSetBotCombosKillsType">Triplekill</p>`;
	} else if (combos[0] != 0) {
		inner += `<p class="matchHistoryDataSetBotCombosKillsType">Doublekill</p>`;
	}

	return inner;
}

match.forEach(function (item) {
	const info = item.info;
	const metaData = info.participants.filter((summoner) => summoner.summonerName === name)[0];
	const items = [metaData.item0, metaData.item1, metaData.item2, metaData.item3, metaData.item4, metaData.item5];
	const combos = [metaData.doubleKills, metaData.tripleKills, metaData.quadraKills, metaData.pentaKills];

	async function getSpell1() {
		const spell1 = await fetch("http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json")
			.then((response) => response.json())
			.then((spell) => Object.values(spell.data))
			.then((spell) => spell.filter((spell) => spell.key == metaData.summoner1Id))
			.then((spell) => spell[0].id);

		async function getSpell2() {
			const spell2 = await fetch("http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json")
				.then((response) => response.json())
				.then((spell) => Object.values(spell.data))
				.then((spell) => spell.filter((spell) => spell.key == metaData.summoner2Id))
				.then((spell) => spell[0].id);

			return spell2;
		}

		async function getRune1() {
			const rune1 = await fetch("http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json")
				.then((response) => response.json())
				.then((rune) => rune.filter((rune) => rune.id == metaData.perks.styles[0].style)[0])
				.then((rune) => rune.slots[0].runes)
				.then((rune) => rune.filter((rune) => rune.id == metaData.perks.styles[0].selections[0].perk)[0].icon);

			return rune1;
		}

		async function getRune2() {
			const rune2 = await fetch("http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json")
				.then((response) => response.json())
				.then((rune) => rune.filter((rune) => rune.id == metaData.perks.styles[1].style)[0])
				.then((rune) => rune.icon);

			return rune2;
		}

		getSpell2().then(function (spell2) {
			DOMSelectors.matchHistory.insertAdjacentHTML(
				"beforeend",
				`<div class="matchHistory-data ${metaData.win}">
					<div class="matchHistoryDataSetTop">
						<p>${info.gameMode}</p>
						<p>${fancyTimeFormat(info.gameDuration)}</p>
					</div>
					<div class="matchHistoryDataSetMid">
						<div class="matchHistoryDataSetMidChamp">
							<div class="matchHistoryDataSetMidChampImg">
								<img class="champIcon" src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${metaData.championName}.png" />
								<div class="matchHistoryDataSetMidChampImgSpells">
										<img class="spellsImg" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${spell1}.png" />
										<img class="spellsImg" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${spell2}.png" />
								</div>
									<div id=${info.gameId} class="matchHistoryDataSetMidChampImgRunes">
								</div>
							</div>
							<p>Level ${metaData.champLevel}</p>
						</div>
						<div class="matchHistoryDataSetMidStats">
							<div>
								<p>${metaData.kills}/${metaData.deaths}/${metaData.assists}</p>
							</div>
							<div>
								<div class="matchHistoryDataSetMidStatsCs">
									<p>${metaData.totalMinionsKilled} cs</p>
									<p>${(metaData.totalMinionsKilled / (info.gameDuration / 60)).toFixed(1)} cs/min</p>
								</div>
							</div>
						</div>
						<div class="matchHistoryDataSetMidInv">
							<div class="matchHistoryDataSetMidItems">
								${insert_img(items)}
							</div>
							<div>
								<img class="items" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${metaData.item6}.png">
							</div>
						</div>
					</div>
					<div>
						<div class="matchHistoryDataSetBotCombos">
							<div class="matchHistoryDataSetBotCombosKills">${insert_combos(combos)}</div>
								<div class="timeSpentDead">
								<p>Time Dead: ${fancyTimeFormat(metaData.totalTimeSpentDead)} <p>
							</div>
						</div>
					</div>
				</div>`
			);

			let runes = document.getElementById(info.gameId);
			getRune1().then(function (rune1) {
				runes.insertAdjacentHTML("beforeend", `<img class="runesImg" src="https://ddragon.canisback.com/img/${rune1}" />`);
			});
			getRune2().then(function (rune2) {
				runes.insertAdjacentHTML("beforeend", `<img class="runesImg" src="https://ddragon.canisback.com/img/${rune2}" />`);
			});
		});
	}
	getSpell1();
});
