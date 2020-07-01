import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as BoardPiece } from "./logo.svg";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, [history]);

  return (
    <div>
      <Container>
        <h3>Game Screen</h3>
        <img src="/../../svg/piece.svg" alt="piece"></img>
      </Container>
    </div>
  );
}
