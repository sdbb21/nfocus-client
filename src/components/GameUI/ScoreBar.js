import React from "react";
import "./ScoreBar.css";
const Score = (props) => {
  return (
    <div className="ScoreContainer">
      <h4>Score: {props.value}</h4>
    </div>
  );
};

export default Score;
