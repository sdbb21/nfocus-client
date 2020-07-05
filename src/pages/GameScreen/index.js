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
let isFigureMatch = false;
let isSoundMatch = false;

export default function GameScreen() {
  const [currentWave, setCurrentWave] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [messageToPlayer, setMessageToPlayer] = useState("");
  const [delay, setDelay] = useState(5000);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, []);

  useInterval(() => {
    loadStates();
    isWaveMatch();
    nextWave();
    setMessageToPlayer("");
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
      setIsPlaying(true);
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
      isFigureMatch = true;
      console.log("Figure Match", isFigureMatch);
    }

    if (
      soundStateArray.length === nBack + 1 &&
      _.isEqual(soundStateArray[0], soundStateArray[nBack])
    ) {
      isSoundMatch = true;
      console.log("Sound Match", isSoundMatch);
    }
  }

  function updateScore(newScore) {
    isFigureMatch = false;
    isSoundMatch = false;
    setScore(score + newScore);
  }

  function checkPlayerAnswer(event) {
    switch (event) {
      case "figure":
        if (isFigureMatch && isSoundMatch) {
          setMessageToPlayer("It was a Double Match! But you got one!");
          updateScore(500);
        } else if (isFigureMatch) {
          setMessageToPlayer("Correct! Figure Match!");
          updateScore(1000);
        } else if (isSoundMatch) {
          setMessageToPlayer("Wrong! It was a Sound Match!");
        } else {
          setMessageToPlayer("Wrong! There was no Match!");
        }
        setIsPlaying(false);
        setDelay(5000);
        return;

      case "sound":
        if (isFigureMatch && isSoundMatch) {
          setMessageToPlayer("It was a Double Match! But you got one!");
          updateScore(500);
        } else if (isSoundMatch) {
          setMessageToPlayer("Correct! Sound Match!");
          updateScore(1000);
        } else if (isFigureMatch) {
          setMessageToPlayer("Wrong! It was a Sound Match!");
        } else {
          setMessageToPlayer("Wrong! There was no Match!");
        }
        setIsPlaying(false);
        setDelay(5000);
        return;

      case "both":
        if (isFigureMatch && isSoundMatch) {
          setMessageToPlayer("Correct! Double Match!");
          updateScore(1000);
        } else if (isSoundMatch) {
          setMessageToPlayer("It was a Sound Match! But you got one!");
          updateScore(500);
        } else if (isFigureMatch) {
          setMessageToPlayer("Wrong! It was a Sound Match!");
        } else {
          setMessageToPlayer("Wrong! There was no Match!");
        }
        setIsPlaying(false);
        setDelay(5000);
        return;

      default:
        return;
    }
  }

  const userInput = isPlaying ? (
    <div className="UserInput">
      <button onClick={(e) => checkPlayerAnswer("figure")}>Figure</button>
      <button onClick={(e) => checkPlayerAnswer("both")}>Both</button>
      <button onClick={(e) => checkPlayerAnswer("sound")}>Sound</button>
      <button onClick={(e) => checkPlayerAnswer("none")}>No Match</button>
    </div>
  ) : (
    ""
  );

  if (piecesStateArray.length > 0 && piecesStateArray.length < nBack + 1) {
    return (
      <div>
        <div className="GameHeader">
          <h3>Prepare to play {user.name}</h3>
        </div>
        <div className="Gameboard">
          <Board piecesArray={piecesStateArray[piecesStateArray.length - 1]} />
        </div>
      </div>
    );
  }

  if (piecesStateArray.length === nBack + 1) {
    return (
      <div>
        <div className="GameHeader">
          <h3>
            Score: {score} Level: {currentLevel + 1} Wave: {currentWave}
          </h3>
        </div>
        <div className="Gameboard">
          <Board piecesArray={piecesStateArray[nBack]} />
        </div>
        <div className="GameFooter">
          <div>{userInput}</div>
          <h1>{messageToPlayer}</h1>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
}
