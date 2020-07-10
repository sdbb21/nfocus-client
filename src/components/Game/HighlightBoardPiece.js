import React from "react";
import pieceHighlight from "../../svg/piecelight.svg";
import "./BoardPiece.css";

const BoardPiece = (props) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        margin: "0",
        paddin: "0",
        position: "absolute",
        width: "112px",
        height: "56px",
        left: props.X * 112,
        top: props.Y * 28,
      }}>
      <img className="Piece" src={pieceHighlight} alt="piece" />
    </div>
  );
};

export default BoardPiece;
