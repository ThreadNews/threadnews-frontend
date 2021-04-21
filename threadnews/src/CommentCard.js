import React, { useState, useEffect } from "react";
import {
  Toast,
  Card,
  Col,
  Row,
  Container,
  Button,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import "./css/commentCard.css";
import { Likes } from "./Likes";

export function CommentCard(props) {
   return(
      <div className="comment-card">
            <div className="comment-author">{props.user_name}</div>
            <hr className="line"></hr>
            <div className="comment-content">{props.comment}</div>
      </div>
   );
}