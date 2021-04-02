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
import "./css/articleCard.css";
import { Likes } from "./Likes";

export function ArticleCard(props) {
  let article = props;
  let sent = article.sentiment;
  console.log("sent: ", sent);
  const [liked, toggleLiked] = useState(false);
  // console.log(article)

  function update_like(article_id) {
    toggleLiked(!liked);
    props.likeArticle(article.id);
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
                <p>{article.publishedAt.substring(0, 10)}</p>
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
                  style={{ float: "left"}}
                  variant="warning"
                  onClick={() => props.set_thread(props.i)}
                >
                  View Comments
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  style={{ float: "left"}}
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
    </div>
  );
}
