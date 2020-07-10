import React from "react";

import "./GameOver.css";

const GameOver = (props) => {
  return props.message ? (
    <div className="GameOverContainer">
      <h1>{props.message}</h1>
      <h3>Your score was: {props.showScore}</h3>
    </div>
  ) : (
    ""
  );
};

export default GameOver;
