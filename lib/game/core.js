export const P1 = "X";
export const P2 = "O";
export const DRAW = "draw";
export const EMPTY = " ";
export const PLAYERS = [P1, P2];

export function updateGame(player, pos, state) {
  const i = pos[0];
  const j = pos[1];

  if (i < 0 || i >= state.length) {
    return [state, false];
  }

  if (j < 0 || j >= state[i].length) {
    return [state, false];
  }

  if (state[i][j] !== EMPTY) {
    return [state, false];
  }

  const newState = state.map((row, rowIndex) => {
    if (rowIndex === i) {
      return row.map((pattern, colIndex) => {
        if (colIndex === j) {
          return player;
        }
        return pattern;
      });
    }
    return row;
  });

  return [newState, true];
}

export function checkWinner(state) {
  const winner = checkRows(state) || checkCols(state) || checkDiags(state);
  if (winner) {
    return winner;
  }
  if (isBoardFull(state)) {
    return "draw";
  }
  return null;
}

export function isBoardFull(state) {
  for (let i = 0; i < state.length; i++) {
    const row = state[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === EMPTY) {
        return false;
      }
    }
  }
  return true;
}

export function checkRows(state) {
  for (let i = 0; i < state.length; i++) {
    const row = state[i];
    const winner = checkRow(row);
    if (winner) {
      return winner;
    }
  }
  return null;
}

export function checkRow(row) {
  const first = row[0];
  if (first === EMPTY) {
    return null;
  }
  for (let i = 1; i < row.length; i++) {
    if (row[i] !== first) {
      return null;
    }
  }
  return first;
}

export function checkCols(state) {
  for (let i = 0; i < state.length; i++) {
    const col = state.map((row) => row[i]);
    const winner = checkRow(col);
    if (winner) {
      return winner;
    }
  }
  return null;
}

export function checkDiags(state) {
  const diag1 = state.map((row, i) => row[i]);
  const diag2 = state.map((row, i) => row[row.length - 1 - i]);
  return checkRow(diag1) || checkRow(diag2);
}

export function getNextPlayer(player) {
  if (player === P1) {
    return P2;
  }
  return P1;
}

export function computeScore(player, depth, board) {
  const winner = checkWinner(board);
  if (winner === P1) {
    return 10 - depth;
  }
  if (winner === P2) {
    return depth - 10;
  }

  if (winner === "draw") {
    return 0;
  }

  const moves = getPossibleMoves(board);
  const scores = moves.map(([i, j]) => {
    const nextPlayer = getNextPlayer(player);
    const [newBoard] = updateGame(nextPlayer, [i, j], board);
    return computeScore(nextPlayer, depth + 1, newBoard);
  });

  if (player === P1) {
    return Math.min(...scores);
  }
  return Math.max(...scores);
}

export function getPossibleMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === EMPTY) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
}

export function computeBestMove(player, board) {
  const moves = getPossibleMoves(board);
  const scores = moves.map(([i, j]) => {
    const [newBoard] = updateGame(player, [i, j], board);
    return computeScore(player, 0, newBoard);
  });

  const bestScore = player === P1 ? Math.max(...scores) : Math.min(...scores);
  const maxScoreIdx = scores.findIndex((x) => x === bestScore);
  return moves[maxScoreIdx];
}

export function createEmptyBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ].map((row) => row.map(() => EMPTY));
}

export function getNextPlayerIdx(playerIdx) {
  return (playerIdx + 1) % PLAYERS.length;
}

export function getPlayerByIdx(playerIdx) {
  return PLAYERS[playerIdx];
}

export function getInitialPlayerIdx() {
  return 0;
}

export function findLine(winner, board) {
  // check rows and columns
  for (let i = 0; i < 3; i++) {
    // check row
    if (checkRow(board[i]) === winner) {
      return [
        [i, 0],
        [i, 2],
      ];
    }
    // check col
    if (checkRow(board.map((row) => row[i])) === winner) {
      return [
        [0, i],
        [2, i],
      ];
    }
  }

  // check diags
  if (
    board[0][0] === winner &&
    board[1][1] === winner &&
    board[2][2] === winner
  ) {
    return [
      [0, 0],
      [2, 2],
    ];
  }

  if (
    board[0][2] === winner &&
    board[1][1] === winner &&
    board[2][0] === winner
  ) {
    return [
      [0, 2],
      [2, 0],
    ];
  }

  throw new Error("No winning line found for the given winner");
}
