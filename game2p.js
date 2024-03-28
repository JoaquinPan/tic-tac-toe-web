import { drawGreenLine, drawGrid, placeMark } from "./lib/game/render";
import circle from "/circle.svg";
import cross from "/cross.svg";

drawGrid();
placeMark(circle, 0, 1);
placeMark(cross, 0, 0);
drawGreenLine(0, 0, 2, 0);
