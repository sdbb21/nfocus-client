import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import { postScore } from "../../store/score/actions";
import Loading from "../../components/Loading";
import Board from "../../components/Game/Board";
import MistakeBar from "../../components/GameUI/MistakeBar";
import TimeBar from "../../components/GameUI/TimeBar";
import ScoreBar from "../../components/GameUI/ScoreBar";
import MessageToPlayer from "../../components/GameUI/MessageToPlayer";
import GameOver from "../../components/GameUI/GameOver";

import Levels from "./levels.json";
import _ from "lodash";
import SoundPlayer from "../../components/Game/SoundPlayer";

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
const delay = 5000;
let piecesStateArray = [];
let soundStateArray = [];
let isFigureMatch = false;
let isSoundMatch = false;

export default function GameScreen() {
  const [currentWave, setCurrentWave] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const [mistakes, setMistakes] = useState(0);
  const [messageToPlayer, setMessageToPlayer] = useState("");
  const history = useHistory();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  history.listen((location, action) => {
    piecesStateArray = [];
    soundStateArray = [];
    isFigureMatch = false;
    isSoundMatch = false;
  });

  useInterval(
    () => {
      loadStates();
      isWaveMatch();
      nextWave();
      setMessageToPlayer("");
      gameOver();
    },
    isPlaying ? null : delay
  );

  function nextWave() {
    //Cycles through the waves, when there's no more, and the player has enough points goes to the next level
    if (currentWave < Levels.allLevels[currentLevel].allWaves.length - 1) {
      setCurrentWave(currentWave + 1);
    } else if (currentLevel < Levels.allLevels.length - 1) {
      setCurrentWave(0);
      setCurrentLevel(currentLevel + 1);
    } else {
      //Game Over
      setMessageToPlayer("You Win");
    }
    //Runs the cycle until the array is full
    if (piecesStateArray.length === nBack + 1) {
      setIsPlaying(true);
    }
  }

  function gameOver() {
    if (mistakes === 3) {
      setIsPlaying(true);
      setCurrentWave(0);
      setCurrentLevel(0);
      if (token && score > 0) {
        dispatch(postScore(parseInt(score), parseInt(user.id)));
      }
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

  function updateMistakes() {
    isFigureMatch = false;
    isSoundMatch = false;
    setMistakes(mistakes + 1);
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
          updateMistakes();
        } else {
          setMessageToPlayer("Wrong! There was no Match!");
          updateMistakes();
        }
        setIsPlaying(false);
        return;

      case "sound":
        if (isFigureMatch && isSoundMatch) {
          setMessageToPlayer("It was a Double Match! But you got one!");
          updateScore(500);
        } else if (isSoundMatch) {
          setMessageToPlayer("Correct! Sound Match!");
          updateScore(1000);
        } else if (isFigureMatch) {
          setMessageToPlayer("Wrong! It was a Figure Match!");
          updateMistakes();
        } else {
          setMessageToPlayer("Wrong! There was no Match!");
          updateMistakes();
        }
        setIsPlaying(false);
        return;

      case "both":
        if (isFigureMatch && isSoundMatch) {
          setMessageToPlayer("Correct! Double Match!");
          updateScore(1000);
        } else if (isSoundMatch) {
          setMessageToPlayer("Wrong! It was a Sound Match!");
          updateMistakes();
        } else if (isFigureMatch) {
          setMessageToPlayer("Wrong! It was a Figure Match!");
          updateMistakes();
        } else {
          setMessageToPlayer("Wrong! There was no Match!");
          updateMistakes();
        }
        setIsPlaying(false);
        return;

      case "none":
        if (!isFigureMatch && !isSoundMatch) {
          setMessageToPlayer("Correct! There was no Match!");
          updateScore(1000);
        } else if (isSoundMatch) {
          setMessageToPlayer("Wrong! It was a Sound Match!");
          updateMistakes();
        } else if (isFigureMatch) {
          setMessageToPlayer("Wrong! It was a Figure Match!");
          updateMistakes();
        } else {
          setMessageToPlayer("Wrong! It was a Double Match!");
          updateMistakes();
        }
        setIsPlaying(false);
        return;

      default:
        return;
    }
  }

  function resetGame() {
    piecesStateArray = [];
    soundStateArray = [];
    isFigureMatch = false;
    isSoundMatch = false;
  }

  const userInput = isPlaying ? (
    <div className="UserInput">
      <button onClick={(e) => checkPlayerAnswer("figure")}>Figure</button>
      <button onClick={(e) => checkPlayerAnswer("both")}>Both</button>
      <button onClick={(e) => checkPlayerAnswer("sound")}>Sound</button>
      <button onClick={(e) => checkPlayerAnswer("none")}>No Match</button>
    </div>
  ) : (
    <div>
      <TimeBar animDuration={delay} />
    </div>
  );

  //Renders

  if (
    piecesStateArray.length > 0 &&
    piecesStateArray.length < nBack + 1 &&
    mistakes < 3
  ) {
    return (
      <div className="MainContainer">
        <div className="GameHeader">
          <MessageToPlayer
            message={`Prepare to start, ${user.name || "Player 1"}`}
          />
        </div>
        <div className="Gameboard">
          <Board piecesArray={piecesStateArray[piecesStateArray.length - 1]} />
          <div className="SoundPlayer">
            <SoundPlayer
              soundType={soundStateArray[soundStateArray.length - 1]}
            />
          </div>
        </div>
        <div className="GameFooter">
          <TimeBar animDuration={10000} />
        </div>
      </div>
    );
  }

  if (piecesStateArray.length === nBack + 1 && mistakes < 3) {
    return (
      <div className="MainContainer">
        <div className="GameHeader">
          <MistakeBar value={mistakes} />
          <ScoreBar value={score} />
        </div>
        <div className="Gameboard">
          <Board piecesArray={piecesStateArray[nBack]} />
          <div className="SoundPlayer">
            <SoundPlayer soundType={soundStateArray[nBack]} />
          </div>
        </div>
        <div className="GameFooter">
          <div>{userInput}</div>
          <MessageToPlayer message={messageToPlayer} />
        </div>
      </div>
    );
  }

  if (mistakes === 3) {
    resetGame();
    return (
      <div className="MainContainer">
        <GameOver message="Game Over" />

        <Link to={`/`}>
          <button className="BackButton">Homepage</button>
        </Link>
        <Link to={`/highscores`}>
          <button className="BackButton">Highscores</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="MainContainer">
      <Loading />
    </div>
  );
}
