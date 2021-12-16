import "../styles/style.css";
async function getData() {
  try {
    const result = await fetch(
      `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?RGAPI-cca58d06-1eea-4731-9f87-3f7d66a5e17c`
    );
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getData();
