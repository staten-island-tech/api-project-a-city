import("../styles/load.css");

const summoner = window.localStorage.getItem("searchData");
async function getPuuid() {
  try {
    const apiPuuid = await fetch(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=RGAPI-70c31577-3dbc-41dd-aab5-ea81e60e6ae0`
    ).then((api) => api.json());
    const puuid = Object.values(apiPuuid)[2];
    const icon = Object.values(apiPuuid)[4];

    export const grabIcon = {
      icon: `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${icon}.png`,
    };

    async function getAccount() {
      try {
        const apiAccount = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-70c31577-3dbc-41dd-aab5-ea81e60e6ae0`
        ).then((api) => api.json());

        let apiMatches = [];
        for (const matchID of apiAccount) {
          const apiMatch = await fetch(
            `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-70c31577-3dbc-41dd-aab5-ea81e60e6ae0`
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
    console.log(error);
  }
}
getPuuid();
