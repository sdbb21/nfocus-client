import React from "react";

export default function ScoreRow(props) {
  return (
    <tr>
      <td>{props.position + 1}</td>
      <td>{props.score}</td>
      <td>{props.date}</td>
    </tr>
  );
}
