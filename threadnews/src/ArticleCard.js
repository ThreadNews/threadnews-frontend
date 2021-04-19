import React, { useState, useEffect } from "react";
import {
  Toast,
  Card,
  Col,
  Row,
  Container,
  Button,
  Badge,
  Form
} from "react-bootstrap";
import axios from "axios";
import "./css/articleCard.css";
import { Likes } from "./Likes";
import { CommentCard } from "./CommentCard";

export function ArticleCard(props) {
  let article = props;
  let sent = article.sentiment;
  console.log("sent: ", sent);
  const [liked, toggleLiked] = useState(false);
  const [showComments, toggleComments] = useState(false);
  const [new_comment, setComment] = useState("");
  // console.log(article)

  function update_like(article_id) {
    toggleLiked(!liked);
    props.likeArticle(article.id);
  }

  function update_comments() {
    toggleComments(!showComments);
  }


  function handleChange(t){ setComment(t.target.value) }

  function post_comment(){
    let data= {action:'add',comment:new_comment,article_id:props.id}
    let head = {headers:{Authorization:"Bearer "+ localStorage.getItem('access_token')}}
    console.log(head)
    axios.post('http://127.0.0.1:5000/comment',data,head).then( result => {
    if (result){
          setComment('');
      }
    });
  }


  const commentList = [
    {
      user: "jon doe",
      comment: "This article was great! I have read it twenty times!",
    },
    { user: "jon doe", comment: "This writter is trash.  " },
    { user: "jon doe", comment: "The sentiment was 100% accurate " },
    { user: "jon doe", comment: "I completely disagree with the article " },
    { user: "jon doe", comment: "WOW. THIS IS THE BEST ARTICLE EVER!!! " },
    { user: "jon doe", comment: "I saw this on the news" },
    { user: "jon doe", comment: "The world is falling apart" },
    { user: "jon doe", comment: "I feel so hopeful!" },
    {
      user: "jon doe",
      comment:
        "I completely agree. The legal system and even all of government is so broken in this society and the only way that that is every going to change is if we band together and fight for the rights of the common people! Even more, the rights of those on the bottom of the social ladder! I want this country's least fortunate soul to still be better off than the top one percent in other countries! I have this vision for our country and I hope that you will all share it with me!",
    },
  ];

  const comments = commentList.map((data, i) => {
    return (
      <div>
        <CommentCard {...data} />
      </div>
    );
  });

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
                        ? "./assets/article_card_icons/heart_full.png"
                        : "./assets/article_card_icons/heart_empty.png"
                    }
                  />
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline"
                  onClick={() => props.saveArticle(article.id)}
                >
                  <img
                    className="icon"
                    src={"./assets/article_card_icons/bookmark_empty.png"}
                  />
                </Button>
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline"
                  onClick={() => props.shareArticle(article.id)}
                >
                  <img
                    className="icon"
                    src={"./assets/article_card_icons/share.png"}
                  />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {showComments ? (
        <Container className="commentsSection"><Row>
          <Col xs={3}>
          <div className="postComment">
              <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows={7} onChange={handleChange} placeHolder='Tell us your thoughts'/>
                </Form.Group>
              </Form>
            <Button  onClick={post_comment}>Post</Button>
          </div>
          </Col>
          <Col xs={9}>
          <div className="commentsBox">{comments}</div>
          </Col>
          </Row>
          </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}
