import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function Start() {
  return (
    <div className="MainContainer">
      <h1>LOGO</h1>
      <div className="MenuContainer">
        <Link to={`/game`}>
          <button className="BackButton">Start Game</button>
        </Link>
        <Link to={`/howtoplay`}>
          <button className="BackButton">How to Play?</button>
        </Link>
        <Link to={`/highscores`}>
          <button className="BackButton">Highscores</button>
        </Link>
      </div>
    </div>
  );
}
