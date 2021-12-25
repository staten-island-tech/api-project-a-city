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
	let combo_names = ["Double kill", "Triple kill", "Quadrakill", "Pentakill"];
	combos.forEach(function (combo, index) {
		if (combo != 0) {
			inner += `<p class="matchHistoryDataSetBotCombosKillsType"> ${combo_names[index]}</p>`;
		}
	});
	return inner;
}

function insert_match(info, metaData) {
	const items = [metaData.item0, metaData.item1, metaData.item2, metaData.item3, metaData.item4, metaData.item5];

	const combos = [metaData.doubleKills, metaData.tripleKills, metaData.quadraKills, metaData.pentaKills];

	return `<div class="matchHistory-data ${metaData.win}">
    <div class="matchHistoryDataSetTop">
        <p>${info.gameMode}</p>
        <p>${fancyTimeFormat(info.gameDuration)}</p>
    </div>
    <div class="matchHistoryDataSetMid">
        <div class="matchHistoryDataSetMidChamp">
            <img
                class="champIcon"
                src="https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${metaData.championName}.png"
                alt=""
            />
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
</div>`;
}

export { insert_match };
