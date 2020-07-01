import "./App.css";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Board from "../../components/Game/Board";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const board = [0];

  useEffect(() => {}, [history]);

  return (
    <div>
      <h3>Game Screen</h3>
      <div className="Gameboard">
        <Board />
      </div>
    </div>
  );
}
