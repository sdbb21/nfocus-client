import React from "react";

export default function ScoreRow(props) {
  const top10 = props.top10;
  return top10 ? (
    <tr>
      <td>{props.position + 1}</td>
      <td>{props.score}</td>
      <td>{props.name}</td>
    </tr>
  ) : (
    <tr>
      <td>{props.position + 1}</td>
      <td>{props.score}</td>
      <td>{props.date}</td>
    </tr>
  );
}
