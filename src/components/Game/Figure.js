import React from "react";
import Figure from "../../svg/figure.svg";

const FigurePiece = (props) => {
  return (
    <div
      className="Figure"
      style={{
        boxSizing: "border-box",
        margin: "0",
        paddin: "0",
        position: "absolute",
        width: "112px",
        height: "112px",
        left: props.X * 112,
        top: props.Y * 56,
      }}>
      <img src={Figure} alt="figure" />
    </div>
  );
};

export default FigurePiece;
