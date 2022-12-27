import {createCell} from './createCell';

export function createBoard(width, height, bombs) {
  const matrix = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push(createCell(row, col));
    }
    matrix.push(newRow);
  }
  // insert bombs
  insertBombs(matrix, bombs);
  // increase nums
  increaseNums(matrix);
  return matrix;
}

function increaseNums(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isBomb) {
        const neighbors = getNeighbors(row, col, matrix);

        for (const neighbor of neighbors) {
          const [row, col] = neighbor;
          matrix[row][col].value += 1;
        }
      }
    }
  }
}

export function getNeighbors(row, col, matrix) {
  const height = matrix.length;
  const width = matrix[row].length;
  const neighbors = [];

  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < height) neighbors.push([row + 1, col]); // DOWN
  if (col + 1 < width) neighbors.push([row, col + 1]); // RIGHT
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT

  if (row - 1 >= 0 && col - 1 >= 0) neighbors.push([row - 1, col - 1]); // UP-LEFT
  if (row - 1 >= 0 && col + 1 < width) neighbors.push([row - 1, col + 1]); // UP-RIGHT
  if (row + 1 < height && col + 1 < width) neighbors.push([row + 1, col + 1]); // DOWN-RIGHT
  if (row + 1 < height && col - 1 >= 0) neighbors.push([row + 1, col - 1]); // DOWN-LEFT

  return neighbors;
}

function insertBombs(matrix, bombs) {
  let bombsToInsert = bombs;

  while (bombsToInsert > 0) {
    let row = Math.floor(Math.random() * matrix.length);
    let col = Math.floor(Math.random() * matrix[0].length);

    if (!matrix[row][col].isBomb) {
      matrix[row][col].isBomb = true;
    }
    bombsToInsert--;
  }
}
