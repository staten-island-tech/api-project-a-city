import("../styles/search.css");
import { DOMSelectors } from "./dom";

DOMSelectors.form.addEventListener("submit", function (e) {
	e.preventDefault();
	const summoner = DOMSelectors.summonerName.value.replace(/\s/g, "");
	if (summoner === "") {
	} else {
		localStorage.setItem("searchData", summoner);
		window.location.href = "./html/loadingScreen.html";
	}
});
