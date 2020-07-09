import React from "react";
import { Link } from "react-router-dom";
import screenshot0 from "../../svg/screenshot0.jpg";
import screenshot1 from "../../svg/screenshot1.jpg";
import "./style.css";

export default function Start() {
  return (
    <div className="MainContainer">
      <h2>How to play nFocus?</h2>
      <div className="InstructionsContainer">
        <img className="Screenshot" src={screenshot0} alt="screenshot0" />
        <img className="Screenshot" src={screenshot1} alt="screenshot1" />
        <p>
          In this game you will see a set of figures on the screen in a certain
          positions and you will hear a sound. In each series{" "}
          <strong>
            you must remember the position and sound that appeared 2 series back
            and compare them with the current one.
          </strong>
        </p>
        <p>
          If you find that one or both of them are repeated, you must indicate
          it by pressing the corresponding buttons on the screen.
          <strong> If you fail 3 times, the game is over.</strong>
        </p>
      </div>

      <Link to={`/`}>
        <button className="BackButton">Back to Home Page</button>
      </Link>
    </div>
  );
}
