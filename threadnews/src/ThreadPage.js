import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Nav";
import axios from "axios";
import { Container, Row, Col, Toast, CardColumns } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./ArticleCard";
import { SentimentCard, sentimentCard } from "./SentimentCard.js";
import {ThreadInfo} from "./ThreadInfo.js"
export function ThreadPage(props) {
  const [index, setIndex] = useState(0);

  const sampleSize = ([...arr], n = 1) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr.slice(0, n);
  };

    const [articles, setArticles] = useState([]);
    
    useEffect(()=> {
        axios.get('http://127.0.0.1:5000/headlines').then( result => {
      if (result){
            setArticles(sampleSize(result.data.articles.slice(),20));
      }
    })
    }, [] )


  function remove_article(id) {
    console.log("removing with id");
    let rm = articles.find((obj) => obj.id === id);
    let n = articles.filter((item) => item !== rm);
    setArticles(n);
    //update on db
  }

  function like_article(articleId) {
    let result = axios.post(
      `http://127.0.0.1:5000/liked_article/${props.user.user_id}/${articleId}`
    );
    // props.user.user_id()
  }

    function like_article(articleId){
        let result = axios.post(`http://127.0.0.1:5000/like/${props.user.user_id}/${articleId}`)
        // props.user.user_id()
    }
  function select_article(i){
    if (i>=0){
      setIndex(i)
      console.log("Selected Article",i)
    }
  }
  

  const cards = articles.slice(0, 20).map((data, i) => {
    
    return (
      <ArticleCard
        {...data}
        key={i}
        i = {i}
        removeArticle={remove_article}
        likeArticle={like_article}
        set_thread = {select_article}

      />
    );
  });
  const sentCards = articles.slice(0, 20).map((data, i) => {
    return (
      <Row>
      <SentimentCard
        {...data}
        key={i}
        set_thread = {()=>this.select_article()}
      />
      
      </Row>
    );
  });



  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="ThreadPage">
        <Container fluid>
          <Row>
            <Col sm={8}>{cards}</Col>
            <Col sm={3}><ThreadInfo {...articles[index]}/></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

// ThreadPage.defaultProps = {
//   user: {
//     user_id: "5ecc439c-6ed0-11eb-a6f4-acde48001122",
//     username: "test username",
//     first_name: "first_name",
//     last_name: "last_name",
//     email: "testuser@gmail.com",
//     interests: [
//       "Economics",
//       "Sports",
//       "Pop Culture",
//       "Beauty",
//       "Fitness",
//       "Architcture",
//     ],
//   },
// }
