import React, { useState } from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import "../css/card.css";
import axios from "axios";
import { CommentCard } from "./CommentCard";

import {
  repost,
  like,
  save,
  post_comment,
} from "../functions/Social";
import { defaultCommentList } from "../data/defaultData";
import { is_logged_in } from "../functions/LocalStorageHelper";
import { CommentInput } from "./CommentInput";
import { get_comments } from "../functions/Social";

require("dotenv").config();

export function PodcastCard(props) {
  let podcast = props.podcast;
  const [liked, toggleLiked] = useState(false);
  const [saved, toggleSaved] = useState(false);
  const [showComments, toggleComments] = useState(false);

  let defaultComments = defaultCommentList;
  if (podcast != null && podcast.comments != null) {
    defaultComments = podcast.comments.concat(defaultComments);
  }
  const [commentList, setCommentList] = useState(defaultComments);
  const [new_comment, setComment] = useState("");

  let logged_in = is_logged_in();

  function update_like(podcast_id) {
    if (sessionStorage.getItem("access_token") == null) return;
    toggleLiked(!liked);
    like(podcast_id,"podcast");
  }

  function user_viewed() {
    let token = sessionStorage.getItem("access_token");
    if (token.length !== 1) {
      let data = { action: "add", id: podcast.id };
      let head = { headers: { Authorization: "Bearer " + token } };
      axios.post(process.env.REACT_APP_BACKEND_URL + "/view", data, head);
    }
    //prompt user to create account or signin
    else {
      console.log("Prompting user to login or create account");
    }
  }

  function toggle_save_podcast(podcast_id) {
    console.log("SAVE podcast CLICKED",podcast_id);
    save(podcast_id,saved,"podcast");
    toggleSaved(!saved);
  }

  function share_podcast() {
    console.log("SHARE podcast CLICKED");
    props.setShare(true);
    props.setSharePodcast(podcast);
  }

  

  function handleChange(t) {
    setComment(t.target.value);
  }

  function post_comment() {
    let data = { action: "add", comment: new_comment, id: podcast.id };
    let head = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };
    console.log(head);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/comment", data, head)
      .then((result) => {
        if (result) {
          let recentComment = [
            {
              user_name: sessionStorage.getItem("user_name"),
              comment: new_comment,
            },
          ];
          let commentListTemp = recentComment.concat(commentList);
          setCommentList(commentListTemp);
          setComment("");
        }
      });
  }

  const comments = commentList.map((data, i) => {
    return (
      <div>
        <CommentCard {...data} />
      </div>
    );
  });

  if (podcast === undefined) {
    return <div></div>;
  }

  let iframe_url = "https://open.spotify.com/embed-podcast/show/" + podcast.uri.slice(13,podcast.uri.length)

  return (
    <div className="pod-card">
      <Container className="pod-container">
      
      <Row width="100%">
      <iframe src={iframe_url} width="100%" height="180" frameBorder="0" allowtransparency="true" allow="encrypted-media"/>
      </Row>
              
        <Row float="center" className="pod-description">
          
          <Col xs={9} className="pod-content">
            <Row>
              <p>{podcast.description.slice(0,160)} ...</p>
            </Row>

            <Row>
                <Button
                  className="comment-button pod-buttons"
                  style={{ float: "left" }}
                  variant="warning"
                  onClick={
                    logged_in
                      ? () => toggleComments(!showComments)
                      : () => props.promptLogin()
                  }
                >
                  {showComments ? "Hide" : "Comments"}
                </Button>

              
              <p
                xs={3}
                className="like-num pod-like">
                {podcast.likes == null
                  ? liked
                    ? 1
                    : 0
                  : liked
                  ? podcast.likes + 1
                  : podcast.likes}
              </p>
                <Button
                  variant="outline"
                  onClick={
                    logged_in
                      ? () => update_like(podcast.id)
                      : () => props.promptLogin()
                  }
                >
                  <img
                    className="icon"
                    src={
                      liked
                        ? process.env.PUBLIC_URL +
                          "/assets/article_card_icons/heart_full.png"
                        : process.env.PUBLIC_URL +
                          "/assets/article_card_icons/heart_empty.png"
                    }
                    alt=""
                  />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggle_save_podcast(podcast.id)}
                >
                  <img
                    className="icon"
                    src={
                      saved
                        ? process.env.PUBLIC_URL +
                          "/assets/article_card_icons/bookmark_full.png"
                        : process.env.PUBLIC_URL +
                          "/assets/article_card_icons/bookmark_empty.png"
                    }
                    alt=""
                  />
                </Button>
                <Button variant="outline" onClick={share_podcast}>
                  <img
                    className="icon"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/article_card_icons/share.png"
                    }
                    alt=""
                  />
                </Button>
              {/* </Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
      {showComments ? (
        <Container className="commentsSection">
          <Row>
            {sessionStorage.getItem("access_token") ? (
              <Col xs={3}>
                <CommentInput
                  post_comment={post_comment}
                  handleChange={handleChange}
                  comment={new_comment}
                />
              </Col>
            ) : (
              <div></div>
            )}
            <Col>
              <div className="commentsBox">{comments}</div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div></div>
      )}
      <div></div>
    </div>
  );
}
