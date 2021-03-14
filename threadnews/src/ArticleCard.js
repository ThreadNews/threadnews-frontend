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
  // console.log(article)
  return (
    <div className="article-card">
      <Container className="article-container">
        <Row float="left" className="">
          <Col xs={3} className="">
            <img
              className="newsImg"
              src={article === "undefined" ? null : article.urlToImage}
              alt=""
            />
          </Col>
          <Col xs={9} className="article-content">
            <Row
              className="article-title"
              style={{ fontSize: 22, fontWeight: "bold" }}
            >
              <p>{article.title}</p>
            </Row>
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
              className="article-desc bordered"
              style={{ fontSize: 18, fontFamily: "TimesNewRoman" }}
            >
              <p>{article.description}</p>
            </Row>
            <Row className="bordered">
              <Col xs={{span:1,offset:9}}>
            <img
              className="icon"
              src={"./assets/article_card_icons/heart_empty.png"}
              />
              </Col>
              <Col xs={1}>
            <img
              className="icon"
              src={"./assets/article_card_icons/bookmark_empty.png"}
              />
              </Col>
              <Col xs={1}>
            <img
              className="icon"
              src={"./assets/article_card_icons/share.png"} 
              />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
