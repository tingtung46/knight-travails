export const board = () => {
  const chessBoard = Array(8)
    .fill([])
    .map((row) => {
      row = Array(8).fill([]);
      return row;
    });

  return chessBoard;
};
