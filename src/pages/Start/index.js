import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, [history]);

  return (
    <div className="MainContainer">
      <h1>LOGO</h1>
      <div className="MenuContainer">
        <div class="vertical-menu">
          <a href="/game">Start Game</a>
          <a href="/howtoplay">How to Play</a>
          <a href="/highscores">Highscores</a>
        </div>
      </div>
    </div>
  );
}
