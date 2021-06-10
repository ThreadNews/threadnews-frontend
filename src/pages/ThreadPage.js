/**
 * page serves as the main page for out site
 * presents articles based of off different topics
 * shows users to follow
 * implements our LoginModal,ShareModal,SocialCol,BubbleRow components
 *
 * @summary page that presents news articles and some social info
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:17:23 
 * Last modified  : 2021-06-09 10:52:52
 */

import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ArticleCard } from "../components/ArticleCard";
import { LoginModal } from "../modals/LoginModal.js";
import Navbar from "../components/Nav";
import ShareModal from "../modals/ShareModal";
import RepostModal from "../modals/repostModal";
import BubbleRow from "../components/BubbleRow";
import {
  get_interests,
  is_logged_in,
} from "../functions/LocalStorageHelper";
import "../css/ThreadPage.css";
import { PodcastCard } from "../components/PodcastCard";

//used to import env variables for frontend and backend urls
require("dotenv").config();

export function ThreadPage(props) {
  const [share, setShare] = useState(false);
  const [repostArticle, setRepostArticle] = useState(false);
  const [promptLogin, setPromptLogin] = useState(false);
  const [shareArticle, setShareArticle] = useState(null);
  const [sharePodcast, setSharePodcast] = useState(null);
  const [articles, setArticles] = useState([]);
  const [tempId, setTempId] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  //uses this default list if the user did not select topis
  let default_interests = ["DIY", "Sports", "Investing", "Crypto"];
  const interest_ls = sessionStorage.getItem("interests")
    ? get_interests()
    : default_interests;

  useEffect(() => {
    //loads article data for article cards
    //will search for different topic if there is topic at end of url
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    let topic =
      window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
        .length === 0
        ? ""
        : window.location.href.substring(
            window.location.href.lastIndexOf("/") + 1
          );
    console.log(window.location.href);
    let data = { topic: topic, n: 50 };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/threads", data, head)
      .then((result) => {
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


    //loads podcast data
    let podcast_data = { interest_list: interest_ls, n: 50,};
    if(topic!==""){
      podcast_data.topic = topic
    }
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/podcasts", podcast_data, head)
      .then((result) => {
        if (result) {
          console.log(Array(result.data.podcasts));
          let shuffled = Array(result.data.podcasts)[0].sort(
            () => 0.5 - Math.random()
          );
          // Get sub-array of first n elements after shuffled
          let selected = shuffled.slice(0, 34);
          setPodcasts(selected);
        }
      });
  }, []);

  function remove_article(id) {
    //triggered when not for me clicked on articleCard
    //removes article from list 
    console.log("removing with id");
    let rm = articles.find((obj) => obj.id === id);
    let n = articles.filter((item) => item !== rm);
    setArticles(n);
    
  }

  function remove_podcast(id) {
    //triggered when not for me clicked on articleCard
    //removes article from list 
    console.log("removing with id");
    let rm = podcasts.find((obj) => obj.id === id);
    let n = podcasts.filter((item) => item !== rm);
    setPodcasts(n);
    //update on db
  }

  //creates list of article cards components based of articles variable
  const cards = articles.slice(0, 20).map((data, i) => {
    return (
      
      <ArticleCard
        article={data}
        setShare={setShare}
        setShareArticle={setShareArticle}
        key={i}
        i={i}
        removeArticle={remove_article}
        setRepostArticle={setRepostArticle}
        promptLogin={() => setPromptLogin(!promptLogin)}
        setTempId={setTempId}
      />
    );
  });

    //creates list of PodcastCards components based of articles variable
    const podcast_cards = podcasts.slice(0, 14).map((data, i) => {
    return (
      <PodcastCard
        podcast={data}
        key={i}
        i={i}
        removePodcast={remove_podcast}
        setShare={setShare}
        setSharePodcast={setSharePodcast}
        promptLogin={() => setPromptLogin(!promptLogin)}
        setTempId={setTempId}
      />
    );
  });

  return (
    <div>
      <title>dddd</title>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Container fluid>
          <Row>
            <BubbleRow
              row={true}
              interests={interest_ls.slice(0,5)}
              header="Your Topics"
            />
          </Row>
          <Row>
            <Col sm={7} className="thread-page-content">
              {cards}
            </Col>
            <Col sm={{ span: 3, offset: 1 }}>{podcast_cards} </Col>
          </Row>
          {share ? (
            <ShareModal
              {...shareArticle}
              {...sharePodcast}
              share={true}
              setShare={setShare}
            />
          ) : null}

          {promptLogin ? <LoginModal setPrompt={setPromptLogin} /> : null}
          {repostArticle ? (
            repostArticle && is_logged_in ? (
              <RepostModal
                article_id={tempId}
                setRepostArticle={setRepostArticle}
              />
            ) : (
              <LoginModal setPrompt={setPromptLogin} />
            )
          ) : null}
        </Container>
      </div>
    </div>
  );
}
