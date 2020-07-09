import React from "react";

import "./GameOver.css";

const GameOver = (props) => {
  return props.message ? (
    <div className="GameOverContainer">
      <h1>{props.message}</h1>
    </div>
  ) : (
    ""
  );
};

export default GameOver;
