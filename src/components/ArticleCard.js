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


//used to import env variables for frontend and backend urls
require("dotenv").config();

export function ArticleCard(props) {
  let article = props.article;
  const [liked, toggleLiked] = useState(false);
  const [saved, toggleSaved] = useState(false);
  const [showComments, toggleComments] = useState(false);

  //sets value to list of default comments if 
  //there are no comments on article
  let defaultComments = defaultCommentList;
  if (article != null && article.comments != null) {
    defaultComments = article.comments.concat(defaultComments);
  }
  const [commentList, setCommentList] = useState(defaultComments);
  const [new_comment, setComment] = useState("");
  let debug = true;

  let logged_in = is_logged_in();

  function update_like(article_id) {
    //interacts with backend to store like on user and article
    if (sessionStorage.getItem("access_token") == null) return;
    toggleLiked(!liked);
    like(article_id);
  }

  function user_viewed() {
    //stores that user has viewed this article in the backend
    let token = sessionStorage.getItem("access_token");
    if (token.length !== 1) {
      let data = { action: "add", article_id: article.id };
      let head = { headers: { Authorization: "Bearer " + token } };
      axios.post(process.env.REACT_APP_BACKEND_URL + "/view", data, head);
    }
    //prompt user to create account or signin
    else {
      console.log("Prompting user to login or create account");
    }
  }

  function toggle_save_article(article_id) {
    //interacts with backend to save article
    console.log("SAVE ARTICLE CLICKED",article_id);
    save(article_id,saved);
    toggleSaved(!saved);
  }

  function share_article() {
    //sets share state variable which triggers modal
    console.log("SHARE ARTICLE CLICKED");
    props.setShare(true);
    props.setShareArticle(article);
  }
  

  function post_comment() {
    //interacts with backend to post comment
    //updates state variables to include new comment
    // sets value of comment input to empty
    let data = { action: "add", comment: new_comment, id: article.id };
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
    // creates list of comment card components
    return (
      <div>
        <CommentCard {...data} />
      </div>
    );
  });

  if (article === undefined) {
    return <div></div>;
  }
  return (
    <div className="article-card">
      <Container className="article-container">
        <Row float="left" className="">
          <Col xs={3} className="">
            <a href={article.url}>
              <img
                className="newsImg"
                src={article === "undefined" ? null : article.urlToImage}
                alt=""
                onClick={user_viewed}
              />
            </a>
          </Col>

          <Col xs={9} className="article-content">
            <a href={article.url}>
              <Row
                className="title"
                style={{
                  fontSize: 22,
                  fontFamily: "TimesNewROman",
                }}
              >
                <p>{article.title!==undefined?article.title.slice(0,200):""}</p>
              </Row>
            </a>

            <Row className="text-muted author-date">
              <Col xs={6}>
                <p>
                  {article.author === "" ? article.source.name : article.author}
                </p>
              </Col>
              <Col xs={6} className="date">
                <p>
                  {article.publishedAt
                    ? article.publishedAt.substring(0, 10)
                    : ""}
                </p>
              </Col>
            </Row>
            <Row
              className="description"
              
            >
              <p>{article.description}</p>
            </Row>

            <Row>
                <Button
                  className="comment-button article-buttons"
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

                <Button
                  className="repost-button article-buttons"
                  variant="secondary"
                  // onClick={() => repost_article(article.id)}
                  onClick={() => {
                    props.setRepostArticle(true);
                    props.setTempId(article.id);
                  }}
                >
                  Repost
                </Button>
                <Button
                  className="not-for-me-button article-buttons"
                  style={{ float: "left" }}
                  variant="outline-danger"
                  onClick={
                    logged_in
                      ? () => props.removeArticle(article.id)
                      : () => props.promptLogin()
                  }
                >
                  Not for me
                </Button>{" "}

              <Col
                xs={3}
                // className="like-num"
                // style={{
                //   fontSize: 30,
                //   fontFamily: "TimesNewROman",
                //   color: "#eee",
                // }}
              >
                <p className="like-num">
                {article.likes == null
                  ? liked
                    ? 1
                    : 0
                  : liked
                  ? article.likes + 1
                  : article.likes}
                  </p>
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline"
                  onClick={
                    logged_in
                      ? () => update_like(article.id)
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
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline"
                  onClick={() => toggle_save_article(article.id)}
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
              </Col>
              <Col xs={1}>
                <Button variant="outline" onClick={share_article}>
                  <img
                    className="icon"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/article_card_icons/share.png"
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
                  handleChange={(t)=> setComment(t.target.value)}
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
