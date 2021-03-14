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
      <Card
        className="mb-auto"
        border=""
        style={{ /*borderRadius: "25px",*/ opacity: 1 }}
      >
        <Card.Body className="text-left">
          <h2
            fontSize="18px"
            style={{ fontFamily: "TimesNewRoman", fontSize: 22 }}
          >
            {article.title}
          </h2>

          <Card.Subtitle
            style={{ float: "left", marginLeft: 15 }}
            className="mb-2 text-muted"
          >
            {article.author}
          </Card.Subtitle>
          <Container style={{ float: "left" }}>
            <Row style={{ float: "left" }}>
              <Col style={{ float: "left" }}>
                <Row>
                  <img
                    className="newsImg"
                    src={article === "undefined" ? null : article.urlToImage}
                    float="left"
                    padding="0"
                    alt=""
                  />
                </Row>
                {/* <Likes
                  likeArticle={props.likeArticle}
                  articleId={props.id}
                  sentiment={article.sentiment}
                /> */}
              </Col>
              <Col sm={8}>
                <blockquote className="blockquote mb-0">
                  <p> {article.description} </p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title">{article.source.name}</cite>
                  </footer>
                </blockquote>
                <Button
                  style={{ float: "right" }}
                  variant="info"
                  href={article.url}
                >
                  vist
                </Button>{" "}
                <Button
                  style={{ float: "right", marginRight: 15 }}
                  variant="outline-danger"
                  onClick={() => props.removeArticle(article.id)}
                >
                  Not for me
                </Button>{" "}
                <Button
                  style={{ float: "right", marginRight: 15 }}
                  variant="warning"
                  onClick={()=>props.set_thread(props.i)}
                >
                  Set Thread
                </Button>
              </Col>
            </Row>
            <div align="right">
              <img
                className="saveButton"
                src={"./assets/heart_icons/heart_empty.svg"}
                float="right"
                padding="0"
                alt=""
                onClick={()=>props.likeArticle(article.id)}
              />
            </div>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}
