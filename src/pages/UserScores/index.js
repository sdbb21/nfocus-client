import React, { useState, useEffect } from "react";
import Moment from "moment";
import Card from "react-bootstrap/Card";
import ScoreRow from "../../components/Scores/ScoreRow";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from "../../store/score/actions";
import { selectScoresByUserId } from "../../store/score/selectors";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import "./style.css";

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
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {userScores.slice(0, 5).map((score, i) => (
                <ScoreRow
                  key={score.id}
                  id={score.id}
                  position={i}
                  score={score.score}
                  date={Moment(score.createdAt).format("LL")}
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
