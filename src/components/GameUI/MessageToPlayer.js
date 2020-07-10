import React from "react";
import "./MessageToPlayer.css";
const MessageToPlayer = (props) => {
  return props.message ? (
    <div className="MessageContainer">
      <h4>{props.message}</h4>
    </div>
  ) : (
    ""
  );
};

export default MessageToPlayer;
