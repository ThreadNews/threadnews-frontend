/**
 * this is used on page where user selects interest
 * also used on threadpage
 *
 * @summary circle with topic text in center
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:32:42 
 * Last modified  : 2021-05-28 22:34:34
 */

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
