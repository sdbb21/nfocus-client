import React from "react";
import { Link } from "react-router-dom";
import LogonFocus from "../../svg/nFocusLogo.svg";

import "./style.css";

export default function Start() {
  return (
    <div className="MainContainer">
      <div className="ImgContainer">
        <img src={LogonFocus} alt="logo" />
        <h2>A mind blowing game.</h2>
      </div>
      <div className="MenuContainer">
        <Link to={`/game`}>
          <button className="BackButton">Start Game</button>
        </Link>
        <Link to={`/instructions`}>
          <button className="BackButton">How to Play?</button>
        </Link>
        <Link to={`/highscores`}>
          <button className="BackButton">Highscores</button>
        </Link>
      </div>
      <div className="Credits">
        <h5>Created by Sebastián Baez</h5>
      </div>
    </div>
  );
}
