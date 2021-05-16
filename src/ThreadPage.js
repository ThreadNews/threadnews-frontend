import React from "react";
import Navbar from "./Nav";
import axios from "axios";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { SentimentCard } from "./SentimentCard.js";
import "./css/ThreadPage.css";
import { SocialCol } from "./SocialCol";
import { LinkContainer } from "react-router-bootstrap";
import { get_user, get_interests } from "./LocalStorageHelper";
import ShareModal from "./ShareModal";
import CategoryBubbleSet from "./category-bubbles";
import BubbleRow from "./BubbleRow";

export function ThreadPage(props) {
  const [interests, setInterests] = useState(0);
  const [share, setShare] = useState(false);
  const [shareArticle, setShareArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("access_token");

    let head = { headers: { Authorization: "Bearer " + token } };
    // let topic = "";
    let topic =
      window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
        .length === 0
        ? ""
        : window.location.href.substring(
            window.location.href.lastIndexOf("/") + 1
          );
    console.log(window.location.href);
    let data = { topic: topic, n: 50 };
    axios.post("http://127.0.0.1:5000/threads", data, head).then((result) => {
      if (result) {
        console.log(Array(result.data.articles));
        const shuffled = Array(result.data.articles)[0].sort(
          () => 0.5 - Math.random()
        );
        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, 34);
        setArticles(selected);
      }
    });
  }, []);

  function remove_article(id) {
    console.log("removing with id");
    let rm = articles.find((obj) => obj.id === id);
    let n = articles.filter((item) => item !== rm);
    setArticles(n);
    //update on db
  }

  let default_interests = ["DIY", "Sports", "Investing", "Crypto"];
  const interest_ls = sessionStorage.getItem("interests")
    ? get_interests()
    : default_interests;
  const varients = ["primary", "secondary", "warning", "info"];
  const pills = interest_ls.map((data, i) => {
    return (
      <LinkContainer to={`/threads/${data}`}>
        <Badge style={{ paddingLeft: "10px" }} pill variant={varients[i]}>
          {data}
        </Badge>
      </LinkContainer>
    );
  });

  const cards = articles.slice(0, 20).map((data, i) => {
    return (
      <Container>
        <Row>
          
        </Row>
        <Row>
          <Col xs={10}>
            <ArticleCard
              article={data}
              setShare={setShare}
              setShareArticle={setShareArticle}
              key={i}
              i={i}
              removeArticle={remove_article}
            />
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    );
  });

  let user = get_user();
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Container fluid>
          <h4>Your Liked Topics</h4>
          <Row>
            <BubbleRow row={true} interests={interest_ls}/>
          </Row>
          <Row>
            <Col sm={10} className="thread-page-content">
              {cards}
            </Col>
            <Col sm={2}>
              <SocialCol></SocialCol>
            </Col>
          </Row>
          {share ? (
            <ShareModal {...shareArticle} share={true} setShare={setShare} />
          ) : null}
        </Container>
      </div>
    </div>
  );
}
