import("../styles/style.css");
import { DOMSelectors } from "./dom";

DOMSelectors.form.addEventListener("submit", function (e) {
  e.preventDefault();
  const summoner = DOMSelectors.summonerName.value;
  localStorage.setItem("searchData", summoner);
  window.location.href = "./html/loadingScreen.html";
});
