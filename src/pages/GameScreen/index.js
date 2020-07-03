import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Board from "../../components/Game/Board";
import Button from "react-bootstrap/Button";
import Levels from "./levels.json";
import _ from "lodash";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const nBack = 2;
let piecesStateArray = [];
let soundStateArray = [];

export default function GameScreen() {
  const [currentWave, setCurrentWave] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, [history]);

  useInterval(() => {
    if (isPlaying) {
      loadStates();
      isWaveMatch();
      nextWave({});
    }
  }, 5000);

  function startGame(event) {
    setIsPlaying(!isPlaying);
  }

  function nextWave(event) {
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

  //Loads pieces & sounds state arrays independently, only 3 of each at the time (Queue)
  function loadStates() {
    if (piecesStateArray.length < nBack + 1) {
      piecesStateArray.push(
        Levels.allLevels[currentLevel].allWaves[currentWave].pieces
      );
      soundStateArray.push(
        Levels.allLevels[currentLevel].allWaves[currentWave].sound
      );
    } else {
      piecesStateArray.shift();
      piecesStateArray.push(
        Levels.allLevels[currentLevel].allWaves[currentWave].pieces
      );
      soundStateArray.shift();
      soundStateArray.push(
        Levels.allLevels[currentLevel].allWaves[currentWave].sound
      );
    }
    console.log(piecesStateArray, soundStateArray);
  }

  //Compares pieces & sounds independently between the first and third position in their arrays
  function isWaveMatch() {
    if (
      piecesStateArray.length === nBack + 1 &&
      _.isEqual(piecesStateArray[0], piecesStateArray[nBack])
    ) {
      console.log("IS A FIGURE MATCH!");
    }
    if (
      soundStateArray.length === nBack + 1 &&
      _.isEqual(soundStateArray[0], soundStateArray[nBack])
    ) {
      console.log("IS A SOUND MATCH!");
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
        <Button onClick={(e) => startGame(e)} type="submit">
          {isPlaying ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
}
