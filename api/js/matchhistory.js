import { DOMSelectors } from "./dom";

export const match = JSON.parse(window.localStorage.getItem("matches"));

const picture = window.localStorage.getItem("icon");
const level = window.localStorage.getItem("level");
const name = window.localStorage.getItem("name");

DOMSelectors.summonerInfo.insertAdjacentHTML(
  "afterbegin",
  `<image src="${picture}" class="profile" alt="SummonerImage"></image>
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
      inner += `<img class="items" src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${item}.png" alt="item">`;
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

let sortedMatches = [];

match.forEach(function (item, i) {
  const info = item.info;

  const metaData = info.participants.filter(
    (summoner) => summoner.summonerName === name
  )[0];
  const items = [
    metaData.item0,
    metaData.item1,
    metaData.item2,
    metaData.item3,
    metaData.item4,
    metaData.item5,
  ];
  const combos = [
    metaData.doubleKills,
    metaData.tripleKills,
    metaData.quadraKills,
    metaData.pentaKills,
  ];

  async function getItems() {
    let results = [];

    const spell1 = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
    )
      .then((response) => response.json())
      .then((spell) => Object.values(spell.data))
      .then((spell) =>
        spell.filter((spell) => spell.key == metaData.summoner1Id)
      )
      .then((spell) => spell[0].id);
    results.splice(0, 0, spell1);

    const spell2 = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
    )
      .then((response) => response.json())
      .then((spell) => Object.values(spell.data))
      .then((spell) =>
        spell.filter((spell) => spell.key == metaData.summoner2Id)
      )
      .then((spell) => spell[0].id);
    results.splice(1, 0, spell2);

    const rune1 = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json"
    )
      .then((response) => response.json())
      .then(
        (rune) =>
          rune.filter((rune) => rune.id == metaData.perks.styles[0].style)[0]
      )
      .then((rune) => rune.slots[0].runes)
      .then(
        (rune) =>
          rune.filter(
            (rune) => rune.id == metaData.perks.styles[0].selections[0].perk
          )[0].icon
      );
    results.splice(2, 0, rune1);

    const rune2 = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json"
    )
      .then((response) => response.json())
      .then(
        (rune) =>
          rune.filter((rune) => rune.id == metaData.perks.styles[1].style)[0]
      )
      .then((rune) => rune.icon);
    results.splice(3, 0, rune2);

    return results;
  }

  getItems().then(function (results) {
    const date = new Date(info.gameEndTimestamp).toLocaleDateString("en-US");

    const time = new Date(info.gameEndTimestamp).toLocaleTimeString("en-US");
    const hourMin = time.slice(-0, -6);
    const suffix = time.slice(-2);
    const betterTime = `${hourMin} ${suffix}`;

    const mat = {
      stamp: info.gameEndTimestamp,
      inner: `<div class="matchHistory-data ${metaData.win}">
					<div class="matchHistoryDataSetTop">
						<p>${info.gameMode}</p>
						<p>${fancyTimeFormat(info.gameDuration)}</p>
						<p id="date">${date}</p>
						<p id="time">${betterTime}</p>
					</div>
					<div class="matchHistoryDataSetMid">
						<div class="matchHistoryDataSetMidChamp">
							<div class="matchHistoryDataSetMidChampImg">
								<img class="champIcon" src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${
                  metaData.championName
                }.png" alt="champIcon"/>
								<div class="matchHistoryDataSetMidChampImgSpells">
										<img class="spellsImg" src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${
                      results[0]
                    }.png" alt="spell Image 1" />
										<img class="spellsImg" src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${
                      results[1]
                    }.png" alt="spells Image 2"/>
								</div>
								<div class="matchHistoryDataSetMidChampImgRunes">
									<img class="runesImg" src="https://ddragon.canisback.com/img/${
                    results[2]
                  }" alt="runes 1" />
									<img class="runesImg rune2" src="https://ddragon.canisback.com/img/${
                    results[3]
                  }" alt="runes 2"/>
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
									<p>${(metaData.totalMinionsKilled / (info.gameDuration / 60)).toFixed(
                    1
                  )} cs/min</p>
								</div>
							</div>
						</div>
						<div class="matchHistoryDataSetMidInv">
							<div class="matchHistoryDataSetMidItems">
								${insert_img(items)}
							</div>
							<div>
								<img class="items" src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${
                  metaData.item6
                }.png" alt="item">
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
				</div>`,
    };

    DOMSelectors.matchHistory.innerHTML = "";
    sortedMatches.push(mat);
    sortedMatches.sort(function (match2, match1) {
      return match1.stamp - match2.stamp;
    });

    sortedMatches.forEach(function (i) {
      DOMSelectors.matchHistory.insertAdjacentHTML("beforeend", i.inner);
    });
  });
});
