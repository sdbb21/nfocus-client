import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import ScoreRow from "../../components/Scores/ScoreRow";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from "../../store/score/actions";
import { selectScores } from "../../store/score/selectors";
import "./style.css";

export default function SignUp() {
  const dispatch = useDispatch();

  const allScores = useSelector(selectScores);

  useEffect(() => {
    dispatch(getScores());
  }, [dispatch]);

  return allScores ? (
    <div className="MainContainer">
      <div className="ScoreBoardHeader">
        <h2>Top 10 Highscores</h2>
      </div>
      <div className="ScoreBoard">
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
      <div className="ScoreFooter"></div>
      <Link to={`/`}>
        <button className="BackButton">Back to Home Page</button>
      </Link>
    </div>
  ) : (
    <Loading />
  );
}
