import { React,useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ArticleCard } from "../components/ArticleCard";
import { LoginModal } from "../modals/LoginModal.js";
import Navbar from "../components/Nav";
// import { SocialCol } from "./component/SocialCol.js";
import ShareModal from "../modals/ShareModal";
import RepostModal from "../modals/repostModal";
import BubbleRow from "../components/BubbleRow";
import { get_user, get_interests, is_logged_in } from "../functions/LocalStorageHelper";
import "../css/ThreadPage.css";
require('dotenv').config()

export function ThreadPage(props) {
  const [share, setShare] = useState(false);
  const [repostArticle, setRepostArticle] = useState(false);
  const [promptLogin, setPromptLogin] = useState(false);
  const [shareArticle, setShareArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [tempId, setTempId] = useState([])
  useEffect(() => {
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

  const cards = articles.slice(0, 20).map((data, i) => {
    return (
      <Container>
        <ArticleCard
          article={data}
          setShare={setShare}
          setShareArticle={setShareArticle}
          key={i}
          i={i}
          removeArticle={remove_article}
          setRepostArticle = {setRepostArticle}
          promptLogin={() => setPromptLogin(!promptLogin)}
          setTempId = {setTempId}
        />
      </Container>
    );
  });

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Container fluid>
          <Row>
            <BubbleRow
              row={true}
              interests={interest_ls}
              header="Your Topics"
            />
          </Row>
          <Row>
            <Col sm={10} className="thread-page-content">
              {cards}
            </Col>
            <Col sm={2}>{/* <SocialCol></SocialCol> */}</Col>
          </Row>
          {share ? (
            <ShareModal {...shareArticle} share={true} setShare={setShare} />
          ) : null}


          {promptLogin ? <LoginModal setPrompt={setPromptLogin} /> : null}
          {repostArticle?(repostArticle&&is_logged_in)  ? <RepostModal article_id = {tempId} setRepostArticle={setRepostArticle} /> : <LoginModal setPrompt={setPromptLogin}/>: null}
        </Container>
      </div>
    </div>
  );
}
