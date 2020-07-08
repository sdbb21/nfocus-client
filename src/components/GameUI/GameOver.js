import React from "react";
import "./MessageToPlayer.css";
const GameOver = (props) => {
  return props.message ? (
    <div className="MessageContainer">
      <h1>{props.message}</h1>
    </div>
  ) : (
    ""
  );
};

export default GameOver;
