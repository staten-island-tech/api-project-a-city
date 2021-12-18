import("../styles/style.css");
import { DOMSelectors } from "./dom";

DOMSelectors.enterButton.addEventListener("click", function () {
	const summoner = DOMSelectors.summonerName.nodeValue;

	async function getData() {
		try {
			const result = await fetch(
				`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-27802d5b-fe40-4aca-a225-ef3488b4b40a`
			);
			const data = await result.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}
	getData();
});
