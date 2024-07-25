import { board } from "./chessBoard.js";

const chessBoard = board();

const Node = (coordinate) => {
  return {
    coordinate,
    possibleMoves: [],
  };
};

const allMoves = [];

const getPossibleMoves = (coordinate) => {
  let node = Node(coordinate);
  let [x, y] = coordinate;

  node.possibleMoves.push(
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 2, y - 1],
    [x - 1, y - 2],
    [x + 2, y + 1],
    [x + 1, y + 2]
  );

  node.possibleMoves = node.possibleMoves.filter((possMove) => {
    let [x, y] = possMove;

    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return possMove;
  });

  allMoves.push(node);
};

for (let i = 0; i < chessBoard.length; i++) {
  for (let j = 0; j < chessBoard.length; j++) {
    getPossibleMoves([i, j]);
  }
}

const findPosition = (start) => {
  let [x, y] = start;
  let [position] = allMoves.filter((move) => {
    if (move.coordinate[0] === x && move.coordinate[1] === y) return move;
  });

  return position;
};

const knightMoves = (start, end) => {
  let queue = [findPosition(start)];
  let [startCol, startRow] = start;
  let [endCol, endRow] = end;

  if (startRow === endRow && startCol === endCol) return [start];
  if (
    startRow < 0 ||
    startRow > 7 ||
    startCol < 0 ||
    startCol > 7 ||
    endRow < 0 ||
    endRow > 7 ||
    endCol < 0 ||
    endCol > 7
  )
    throw Error("Out of boundaries");

  while (queue.length) {
    let nextNode = queue.shift();
    let checkPossMove = nextNode.possibleMoves.filter((possMove) => {
      let [x, y] = possMove;
      if (x === endCol && y === endRow) return possMove;
    });

    if (checkPossMove.length === 0) {
      nextNode.possibleMoves.forEach((move) => {
        queue.push(findPosition(move));
      });
    } else {
      let sequence = knightMoves(start, nextNode.coordinate);
      sequence.push(checkPossMove.flat());
      return sequence;
    }
  }
};

export const displayResult = (start, end) => {
  const sequence = knightMoves(start, end);

  let execution = `> knightMoves([${start}], [${end}])`;
  let moves = sequence.length;

  console.log(execution);
  console.log(`=> You made it in ${moves - 1} moves! Here's your path:`);
  sequence.forEach((move) => {
    console.log(move);
  });
};
