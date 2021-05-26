//react imports
import React from "react";
//css imports
import "../css/TopicBubble.css";

export default function TopicBubble(props) {
  return (
    <div
      style={{
        backgroundColor: "#F0FFFFd0",
      }}
      className="TopicBubble"
      onClick={props.onClick}
    >
      {true ? (
        <div className="bubbleContainer">
          <p className="bubbleText">{props.topic}</p>
        </div>
      ) : null}
    </div>
  );
}
