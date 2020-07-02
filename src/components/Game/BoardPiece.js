import React from "react";
import pieceLight from "../../svg/piecelight.svg";
import pieceDark from "../../svg/piecedark.svg";
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
      <img className="Piece" src={pieceDark} alt="piece" />
    </div>
  );
};

export default BoardPiece;
