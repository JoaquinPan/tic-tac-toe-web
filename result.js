import { DRAW, P2 } from "./lib/game/core";
import circle from "/circle.svg";
import cross from "/cross.svg";

const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const winner = parameters.get("winner");
const resutlt = document.getElementById("result");

if (winner === DRAW) {
  const text = document.createElement("span");
  text.innerText = "平手！";
  resutlt.appendChild(text);
} else {
  const img = document.createElement("img");
  img.src = winner === P2 ? circle : cross;
  const text = document.createElement("span");
  text.innerText = "獲勝！";
  resutlt.appendChild(img);
  resutlt.appendChild(text);
}
