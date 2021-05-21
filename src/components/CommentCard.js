import React from "react";
import "../css/commentCard.css";

export function CommentCard(props) {
  if (props === null || props === undefined || props.id === null) {
    return null;
  }
  let following = sessionStorage.getItem("following");
  let color =
    following.includes(props.id) &&
    sessionStorage.getItem("following") !== "undefined"
      ? "comment-card friend-card"
      : "comment-card";
  return (
    <div className={color}>
      <div className="comment-author">{props.user_name}</div>
      <hr className="line"></hr>
      <div className="comment-content">{props.comment}</div>
    </div>
  );
}
