import React from "react";
import "./MistakeBar.css";
const MistakeBar = (props) => {
  return (
    <div className="MistakeContainer">
      <h4>Mistakes: {props.value}/3</h4>
    </div>
  );
};

export default MistakeBar;
