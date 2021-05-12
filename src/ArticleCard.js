import React, { useState } from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import "./css/articleCard.css";
import axios from "axios";
import { CommentCard } from "./CommentCard";
import { repost_article, like_article, save_article,post_comment } from "./Social";
import {defaultCommentList} from './defaultData'
import { CommentInput } from "./CommentInput";
export function ArticleCard(props) {
  let article = props.article;
  const [liked, toggleLiked] = useState(false);
  const [saved, toggleSaved] = useState(false);
  const [showComments, toggleComments] = useState(false);
  const [new_comment, setComment] = useState("");


  function update_like(article_id) {
    if (sessionStorage.getItem("access_token") == null) return;
    toggleLiked(!liked);
    like_article(article_id);
  }

  function toggle_save_article(article_id) {
    console.log("SAVE ARTICLE CLICKED");
    save_article(article_id);
    toggleSaved(!saved);
    
  }

  function share_article() {
    console.log("SHARE ARTICLE CLICKED");
    props.setShare(true);
    props.setShareArticle(article);
  }

  function user_viewed() {
    let token = sessionStorage.getItem("access_token");
    if (token.length !== 1) {
      let data = { action: "add", article_id: article.id };
      let head = { headers: { Authorization: "Bearer " + token } };
      axios.post("http://127.0.0.1:5000/view", data, head);
    }
    //prompt user to create account or signin
    else {
      console.log("Prompting user to login or create account");
    }
  }
  function update_comments() {
    toggleComments(!showComments);
  }

  function handleChange(t) {
    setComment(t.target.value);
  }

  function post_comment() {
    let data = { action: "add", comment: new_comment, article_id: article.id };
    let head = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };
    console.log(head);
    axios.post("http://127.0.0.1:5000/comment", data, head).then((result) => {
      if (result) {
        setComment(new_comment);
      }
    });
  }

  let commentList = defaultCommentList;

  if (article!=null && article.comments != null) {
    commentList = article.comments.concat(commentList);
  }

  const comments = commentList.map((data, i) => {
    return (
      <div>
        <CommentCard {...data} />
      </div>
    );
  });

  if(article===undefined){
    return(<div></div>)
  }
  return (
    <div className="article-card">
      <Container className="article-container">
        <Row float="left" className="">
          <Col xs={3} className="">
            <a href={article.url}
              
            >
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
                className="article-title"
                style={{
                  fontSize: 22,
                  fontFamily: "TimesNewROman",
                  color: "#eee",
                }}
              >
                <p>{article.title}</p>
              </Row>
            </a>
            <Row className="text-muted article-author-date">
              <Col xs={6}>
                <p>
                  {article.author === "" ? article.source.name : article.author}
                </p>
              </Col>
              <Col xs={6} className="article-date">
                <p>
                  {article.publishedAt
                    ? article.publishedAt.substring(0, 10)
                    : ""}
                </p>
              </Col>
            </Row>
            <Row
              className="article-desc "
              style={{ fontSize: 18, fontFamily: "TimesNewRoman" }}
            >
              <p>{article.description}</p>
            </Row>

            <Row className="">
              <Col xs={2}>
                <Button
                  style={{ float: "left" }}
                  variant="warning"
                  onClick={() => update_comments()}
                >
                  {showComments ? "Hide" : "Comments"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => repost_article(article.id)}
                >
                  Repost
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  style={{ float: "left" }}
                  variant="outline-danger"
                  onClick={() => props.removeArticle(article.id)}
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
                {article.likes == null
                  ? liked
                    ? 1
                    : 0
                  : liked
                  ? article.likes + 1
                  : article.likes}
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline"
                  onClick={() => update_like(article.id)}
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
                <Button variant="outline" onClick={()=>toggle_save_article(article.article_id)}>
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
                <Button variant="outline" onClick={() => share_article()}>
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
                <CommentInput post_comment = {post_comment} handleChange={handleChange}/>
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