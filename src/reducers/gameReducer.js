import {getNeighbors} from '../utils/createBoard';

export function gameReducer(state, action) {
  const {type, row, col} = action;

  switch (type) {
    case 'HANDLE_CELL': {
      if (state.board[row][col].isBomb) {
        return {
          ...state,
          board: flipAll(state.board),
          isGameOver: true,
        };
      } else if (state.board[row][col].value === 0) {
        // expand
        return {
          ...state,
          board: expand(row, col, state.board),
        };
      } else {
        return {
          ...state,
          board: flipCell(row, col, state.board),
        };
      }
    }
    default: {
      console.log('error, action unknown');
    }
  }
}

function flipCell(row, col, board) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    isFlipped: true,
  };
  newBoard[row][col] = newCell;
  return newBoard;
}

function expand(row, col, board) {
  const newBoard = board.slice();
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [row, col] = stack.pop();
    const neighbors = getNeighbors(row, col, newBoard);

    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      if (newBoard[row][col].isFlipped) continue;
      if (!newBoard[row][col].isBomb) {
        newBoard[row][col].isFlipped = true;
        if (newBoard[row][col].value > 0) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }
  return newBoard;
}

function flipAll(board) {
  const newBoard = board.slice();
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      const cell = newBoard[row][col];
      const newCell = {
        ...cell,
        isFlipped: true,
      };
      newBoard[row][col] = newCell;
    }
  }
  return newBoard;
}

function numOfOpenCells(board) {
  let total = 0;

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      if (board[row][col].isFlipped) {
        total++;
      }
    }
  }
  return total;
}
