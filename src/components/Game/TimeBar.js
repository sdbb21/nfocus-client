import React from "react";
import "./TimeBar.css";
const TimeBar = (props) => {
  return (
    <div className="Background">
      <div
        className="TimePassed"
        style={{
          animationDuration: props.animDuration + "ms",
        }}></div>
    </div>
  );
};

export default TimeBar;
