import "./style.css";
import React, { useState, useEffect } from "react";
import { selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Board from "../../components/Game/Board";
import Button from "react-bootstrap/Button";
import Levels from "./levels.json";

export default function GameScreen() {
  const [currentWave, setCurrentWave] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, [history]);

  function nextWave(event) {
    event.preventDefault();
    //Cycles through the waves, when there's no more, and the player has enough points goes to the next level
    if (currentWave < Levels.allLevels[currentLevel].allWaves.length - 1) {
      setCurrentWave(currentWave + 1);
    } else if (currentLevel < Levels.allLevels.length - 1) {
      setCurrentWave(0);
      setCurrentLevel(currentLevel + 1);
    } else {
      //Game Over
      setCurrentWave(0);
      setCurrentLevel(0);
    }
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <div className="Gameboard">
        <Board
          piecesArray={
            Levels.allLevels[currentLevel].allWaves[currentWave].pieces
          }
        />
        <Button onClick={(e) => nextWave(e)} type="submit">
          Next
        </Button>
      </div>
    </div>
  );
}
