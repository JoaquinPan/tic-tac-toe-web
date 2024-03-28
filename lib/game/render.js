export const BOARD_WIDTH = 450;
export const CELL_WIDTH = BOARD_WIDTH / 3;
export const LINE_WIDTH = 10;
export const LINE_LENGTH = 410;
export const MARK_WIDTH = 100;

export function drawHorizontalLine(offset) {
  const parent = document.getElementById("app");
  const line = document.createElement("div");
  line.style.width = `${LINE_LENGTH}px`;
  line.style.height = `${LINE_WIDTH}px`;
  line.style.backgroundColor = "white";
  line.style.position = "absolute";
  line.style.top = `${offset - LINE_WIDTH / 2}px`;
  line.style.left = `${(BOARD_WIDTH - LINE_LENGTH) / 2}px`;
  line.style.borderRadius = "5px";

  parent.appendChild(line);
}

export function drawVerticalLine(offset) {
  const parent = document.getElementById("app");
  const line = document.createElement("div");
  line.style.width = `${LINE_WIDTH}px`;
  line.style.height = `${LINE_LENGTH}px`;
  line.style.backgroundColor = "white";
  line.style.position = "absolute";
  line.style.top = `${(BOARD_WIDTH - LINE_LENGTH) / 2}px`;
  line.style.left = `${offset - LINE_WIDTH / 2}px`;
  line.style.borderRadius = "5px";

  parent.appendChild(line);
}

export function drawGrid() {
  drawHorizontalLine(150);
  drawHorizontalLine(300);
  drawVerticalLine(150);
  drawVerticalLine(300);
}

export function placeMark(svg, i, j) {
  const parent = document.getElementById("app");
  const mark = document.createElement("img");
  mark.src = svg;
  mark.style.width = MARK_WIDTH;
  mark.style.height = MARK_WIDTH;
  mark.style.position = "absolute";
  mark.style.top = `${i * CELL_WIDTH + CELL_WIDTH / 2 - MARK_WIDTH / 2}px`;
  mark.style.left = `${j * CELL_WIDTH + CELL_WIDTH / 2 - MARK_WIDTH / 2}px`;

  parent.appendChild(mark);
}

export function drawGreenLine(i1, j1, i2, j2) {
  const parent = document.getElementById("app");
  const line = document.createElement("div");
  line.style.height = `${LINE_WIDTH}px`;
  line.style.backgroundColor = "rgba(0, 242, 111, 0.76)";
  line.style.borderRadius = "5px";
  line.style.position = "absolute";
  line.style.top = `${i1 * CELL_WIDTH + CELL_WIDTH / 2 - LINE_WIDTH / 2}px`;
  line.style.left = `${j1 * CELL_WIDTH + CELL_WIDTH / 2 - LINE_WIDTH / 2}px`;
  line.style.transformOrigin = "left";

  const v1 = [i2 - i1, j2 - j1];
  const v1Length = Math.sqrt(v1[0] ** 2 + v1[1] ** 2);
  const v2 = [0, 1];
  const v2Length = Math.sqrt(v2[0] ** 2 + v2[1] ** 2);
  const cosTheta = (v1[0] * v2[0] + v1[1] * v2[1]) / (v1Length * v2Length);
  const theta = Math.acos(cosTheta);
  line.style.transform = `rotate(${theta}rad)`;
  line.style.transition = "width 1s";
  line.style.width = 0;
  setTimeout(() => {
    line.style.width = `${(BOARD_WIDTH * 0.66 * v1Length) / 2}px`;
  }, 0);

  parent.appendChild(line);
}
