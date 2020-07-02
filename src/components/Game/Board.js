import "./Board.css";
import React from "react";
import BoardPiece from "./BoardPiece";
import FigurePiece from "../../components/Game/Figure";
const boardArray = [
  [0, 1, 2, 3, 4, 5, 6],
  [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
  [0, 1, 2, 3, 4, 5, 6],
  [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
  [0, 1, 2, 3, 4, 5, 6],
  [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
  [0, 1, 2, 3, 4, 5, 6],
  [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
  [0, 1, 2, 3, 4, 5, 6],
  [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
  [0, 1, 2, 3, 4, 5, 6],
  [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
  [0, 1, 2, 3, 4, 5, 6],
];

const Board = () => {
  return (
    <div className="Board">
      {boardArray.map((row, i) => {
        console.log("Row:", row[i], i);
        return row.map((col, j) => {
          console.log("Col:", col, j);
          return <BoardPiece key={`${i}${j}`} id={`${i}${j}`} X={col} Y={i} />;
        });
      })}
      <FigurePiece X={1} Y={2} figureType={0} animDuration={2} />
      <FigurePiece X={2} Y={1} figureType={1} animDuration={2.5} />
      <FigurePiece X={3} Y={0} figureType={2} animDuration={3} />
      <FigurePiece X={2} Y={3} figureType={3} animDuration={4} />
      <FigurePiece X={3} Y={2} figureType={4} animDuration={2.7} />
      <FigurePiece X={4} Y={1} figureType={5} animDuration={2.2} />
      <FigurePiece X={3} Y={4} figureType={0} animDuration={3.5} />
      <FigurePiece X={4} Y={3} figureType={1} animDuration={4.5} />
      <FigurePiece X={5} Y={2} figureType={2} animDuration={2.1} />
    </div>
  );
};

export default Board;
