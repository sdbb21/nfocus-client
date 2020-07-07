import React from "react";
import "./Figure.css";
import Figure0 from "../../svg/pyramid_s.svg";
import Figure1 from "../../svg/pyramid_l.svg";
import Figure2 from "../../svg/cube_s.svg";
import Figure3 from "../../svg/cube_l.svg";
import Figure4 from "../../svg/trunk_s.svg";
import Figure5 from "../../svg/trunk_l.svg";

const figureSvgs = [Figure0, Figure1, Figure2, Figure3, Figure4, Figure5];

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
        animationDuration: props.animDuration + "s",
      }}>
      <img src={figureSvgs[props.figureType]} alt="figure" />
    </div>
  );
};

export default FigurePiece;
