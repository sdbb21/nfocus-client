import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ScoreRow from "../../components/Scores/ScoreRow";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from "../../store/score/actions";
import { selectScores } from "../../store/score/selectors";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allScores = useSelector(selectScores);

  useEffect(() => {
    dispatch(getScores());
  }, [dispatch]);

  return allScores ? (
    <div className="MainContainer">
      <div className="CardContainer col-6 p-3">
        <div>
          <h3>
            {" "}
            <span role="img" aria-label="bids">
              🤑
            </span>{" "}
            Top 10{" "}
            <span role="img" aria-label="bids">
              🤑
            </span>
          </h3>
          <table className="table table-striped table-dark table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Score</th>
                <th scope="col">Player</th>
              </tr>
            </thead>
            <tbody>
              {allScores.slice(0, 10).map((score, i) => (
                <ScoreRow
                  key={score.id}
                  id={score.id}
                  position={i}
                  score={score.score}
                  name={score.user.name}
                  top10={true}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}
