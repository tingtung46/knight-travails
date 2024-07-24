import { board } from "./chessBoard.js";

const chessBoard = board();

const Node = (coordinate) => {
  return {
    coordinate,
    possibleMoves: [],
  };
};

export const allMoves = [];

const getPossibleMoves = (coordinate) => {
  let node = Node(coordinate);
  let [x, y] = coordinate;

  node.possibleMoves.push(
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 2, y - 1]
  );

  node.possibleMoves = node.possibleMoves.filter((possMove) => {
    let [x, y] = possMove;

    if (x >= 0 && x < 7 && y >= 0 && y < 7) return possMove;
  });

  allMoves.push(node);
};

for (let i = chessBoard.length - 1; i >= 0; i--) {
  for (let j = 0; j < chessBoard.length; j++) {
    getPossibleMoves([i, j]);
  }
}
