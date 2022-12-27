export function createCell(row, col) {
  return {
    row,
    col,
    isBomb: false,
    isFlipped: false,
    value: 0,
  };
}
