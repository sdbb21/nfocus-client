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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFigureMatch, setIsFigureMatch] = useState(false);
  const [isSoundMatch, setIsSoundMatch] = useState(false);
  const [messageToPlayer, setMessageToPlayer] = useState("Hola");
  const [delay, setDelay] = useState(5000);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, []);

  useInterval(() => {
    loadStates();
    isWaveMatch();
    nextWave();
  }, delay);

  function nextWave() {
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
    //Runs the cycle until the array is full
    if (piecesStateArray.length === nBack + 1) {
      setDelay(null);
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
      setIsFigureMatch(true);
      console.log("Figure Match", isFigureMatch);
    }

    if (
      soundStateArray.length === nBack + 1 &&
      _.isEqual(soundStateArray[0], soundStateArray[nBack])
    ) {
      setIsSoundMatch(true);
      console.log("Sound Match", isSoundMatch);
    }
  }

  function checkPlayerAnswer(event) {
    if (event === "both") {
    }
    //FIX THIS!
    setDelay(5000);
  }

  if (piecesStateArray.length > 0 && piecesStateArray.length < nBack + 1) {
    return (
      <div>
        <h3 style={{ color: "red" }}>{user.name}</h3>
        <div className="Gameboard">
          <Board piecesArray={piecesStateArray[piecesStateArray.length - 1]} />
        </div>
      </div>
    );
  }

  if (piecesStateArray.length === nBack + 1) {
    return (
      <div>
        <h3 style={{ color: "red" }}>{user.name}</h3>
        <div className="Gameboard">
          <Board piecesArray={piecesStateArray[nBack]} />
        </div>
        <button onClick={(e) => checkPlayerAnswer("both")}>Both</button>
      </div>
    );
  }
  return <h1>Loading...</h1>;
}
