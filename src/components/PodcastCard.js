import React, { useState } from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import "../css/podcastCard.css";
import axios from "axios";
import { CommentCard } from "./CommentCard";

import {
  repost_podcast,
  like_podcast,
  save_podcast,
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
  let debug = true;

  let logged_in = is_logged_in();

  function update_like(podcast_id) {
    if (sessionStorage.getItem("access_token") == null) return;
    toggleLiked(!liked);
    like_podcast(podcast_id);
  }

  function user_viewed() {
    let token = sessionStorage.getItem("access_token");
    if (token.length !== 1) {
      let data = { action: "add", podcast_id: podcast.id };
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
    save_podcast(podcast_id,saved);
    toggleSaved(!saved);
  }

  function share_podcast() {
    console.log("SHARE podcast CLICKED");
    props.setShare(true);
    props.setSharePodcast(podcast);
  }

  function update_comments() {
    toggleComments(!showComments);
  }

  function handleChange(t) {
    setComment(t.target.value);
  }

  function post_comment() {
    let data = { action: "add", comment: new_comment, podcast_id: podcast.id };
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
  return (
    <div className="podcast-card">
      <Container className="podcast-container">
        <Row float="left" className="">
          <Col xs={3} className="">
            <a href={podcast.url}>
              <img
                className="newsImg"
                src={podcast === "undefined" ? null : podcast.urlToImage}
                alt=""
                onClick={user_viewed}
              />
            </a>
          </Col>

          <Col xs={9} className="podcast-content">
            <a href={podcast.url}>
              <Row
                className="podcast-title"
                style={{
                  fontSize: 22,
                  fontFamily: "TimesNewROman",
                }}
              >
                <p>{podcast.title}</p>
                {debug ? <p>{podcast.main_topic}</p> : ""}
              </Row>
            </a>

            <Row className="text-muted podcast-author-date">
              <Col xs={6}>
                <p>
                  {podcast.author === "" ? podcast.source.name : podcast.author}
                </p>
              </Col>
              <Col xs={6} className="podcast-date">
                <p>
                  {podcast.publishedAt
                    ? podcast.publishedAt.substring(0, 10)
                    : ""}
                </p>
              </Col>
            </Row>
            <Row
              className="podcast-desc "
              style={{ fontSize: 18, fontFamily: "TimesNewRoman" }}
            >
              <p>{podcast.description}</p>
            </Row>

            <Row>
              <Col xs={2}>
                <Button
                  className="comment-button"
                  style={{ float: "left" }}
                  variant="warning"
                  onClick={
                    logged_in
                      ? () => update_comments()
                      : () => props.promptLogin()
                  }
                >
                  {showComments ? "Hide" : "Comments"}
                </Button>

                <Button
                  className="repost-button"
                  variant="secondary"
                  // onClick={() => repost_podcast(podcast.id)}
                  onClick={() => {
                    props.setRepostPodcast(true);
                    props.setTempId(podcast.id);
                  }}
                >
                  Repost
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  className="not-for-me-button"
                  style={{ float: "left" }}
                  variant="outline-danger"
                  onClick={
                    logged_in
                      ? () => props.removePodcast(podcast.id)
                      : () => props.promptLogin()
                  }
                >
                  Not for me
                </Button>{" "}
              </Col>
              <Col xs={2}></Col>
              <Col
                xs={3}
                className="like-num"
                style={{
                  fontSize: 30,
                  fontFamily: "TimesNewROman",
                  color: "#eee",
                }}
              >
                {podcast.likes == null
                  ? liked
                    ? 1
                    : 0
                  : liked
                  ? podcast.likes + 1
                  : podcast.likes}
              </Col>
              <Col xs={1}>
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
                          "/assets/podcast_card_icons/heart_full.png"
                        : process.env.PUBLIC_URL +
                          "/assets/podcast_card_icons/heart_empty.png"
                    }
                    alt=""
                  />
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline"
                  onClick={() => toggle_save_podcast(podcast.id)}
                >
                  <img
                    className="icon"
                    src={
                      saved
                        ? process.env.PUBLIC_URL +
                          "/assets/podcast_card_icons/bookmark_full.png"
                        : process.env.PUBLIC_URL +
                          "/assets/podcast_card_icons/bookmark_empty.png"
                    }
                    alt=""
                  />
                </Button>
              </Col>
              <Col xs={1}>
                <Button variant="outline" onClick={share_podcast}>
                  <img
                    className="icon"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/podcast_card_icons/share.png"
                    }
                    alt=""
                  />
                </Button>
              </Col>
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
