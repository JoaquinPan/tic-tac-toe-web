import {
  DRAW,
  P1,
  P2,
  checkWinner,
  createEmptyBoard,
  findLine,
  getInitialPlayerIdx,
  getNextPlayerIdx,
  updateGame,
} from "./lib/game/core";
import { drawGreenLine, drawGrid, placeMark } from "./lib/game/render";
import circle from "/circle.svg";
import cross from "/cross.svg";

const players = [
  { char: P1, svg: cross },
  { char: P2, svg: circle },
];
let board = createEmptyBoard();
let currentPlayerIdx = getInitialPlayerIdx();

function clickHandler(i, j) {
  const [newBoard, success] = updateGame(
    players[currentPlayerIdx].char,
    [i, j],
    board
  );
  placeMark(players[currentPlayerIdx].svg, i, j);
  const winner = checkWinner(newBoard);
  if (winner === DRAW) {
    setTimeout(() => {
      alert("平手");
      location.replace("/result.html?winner=" + DRAW);
    }, 0);
    return;
  }
  if (winner !== null) {
    const line = findLine(winner, newBoard);
    drawGreenLine(line[0][0], line[0][1], line[1][0], line[1][1]);
    setTimeout(() => {
      alert(winner + "贏了");
      location.replace("/result.html?winner=" + winner);
    }, 1000);

    return;
  }

  board = newBoard;
  currentPlayerIdx = getNextPlayerIdx(currentPlayerIdx);
}

function addEventListeners() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells[i * 3 + j].addEventListener("click", () => clickHandler(i, j));
    }
  }
}

drawGrid();
addEventListeners();
