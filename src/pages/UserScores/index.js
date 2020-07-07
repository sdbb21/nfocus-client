import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ScoreRow from "../../components/Scores/ScoreRow";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from "../../store/score/actions";
import { selectScoresByUserId } from "../../store/score/selectors";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const userScores = useSelector(selectScoresByUserId(parseInt(id)));

  console.log("This is ID:", id, user.id);
  useEffect(() => {
    dispatch(getScores());
  }, [dispatch]);

  return userScores ? (
    <div>
      <Card border="dark">
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
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Score</th>
                <th scope="col">Player</th>
              </tr>
            </thead>
            <tbody>
              {userScores.map((score, i) => (
                <ScoreRow
                  key={score.id}
                  id={score.id}
                  position={i}
                  score={score.score}
                  name={score.user.name}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  ) : (
    <p>Loading</p>
  );
}
