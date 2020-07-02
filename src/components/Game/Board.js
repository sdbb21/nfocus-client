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

const Board = (props) => {
  return (
    <div className="Board">
      {boardArray.map((row, i) => {
        return row.map((col, j) => {
          return <BoardPiece key={`${i}${j}`} id={`${i}${j}`} X={col} Y={i} />;
        });
      })}

      {props.piecesArray.map((piece, i) => {
        const [xpos, ypos, figType, aniDur] = piece;
        return (
          <FigurePiece
            key={i}
            X={xpos}
            Y={ypos}
            figureType={figType}
            animDuration={aniDur}
          />
        );
      })}
    </div>
  );
};

export default Board;
