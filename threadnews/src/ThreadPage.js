import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Nav";
import axios from "axios";
import { Container, Row, Col, Toast, CardColumns } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./ArticleCard";
import {ThreadInfo} from "./ThreadInfo.js"
import { SentimentCard } from "./SentimentCard.js";
import "./css/ThreadPage.css";
import { CommentCol } from "./CommentCol";
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
        axios.post('http://127.0.0.1:5000/threads/a/a').then( result => {
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


    function like_article(articleId){
      let token = localStorage.getItem('access_token')
      let data = {action:'add',article_id:articleId}
      let head = {headers:{Authorization:"Bearer "+ localStorage.getItem('access_token')}}
      let result = axios.post('http://127.0.0.1:5000/like',data,head)
      // props.user.user_id()
    }
  function select_article(i){
    if (i>=0){
      setIndex(i)
      console.log("Selected Article",i)
    }
  }
  function save_article(articleID){
    
  }

  function share_article(articleID){
    
  }

  const cards = articles.slice(0, 20).map((data, i) => {
    
    return (
      <Container>
      <Row>
        <Col xs={10} >
      <ArticleCard 
        {...data}
        key={i}
        i = {i}
        removeArticle={remove_article}
        likeArticle={like_article}
        set_thread = {select_article}
        saveArticle={save_article}
        shareArticle={share_article}
      />
      </Col>
      
      <Col xs = {2}>
      <SentimentCard
      {...data}
      key={i}
      set_thread = {()=>this.select_article()}
      />
      </Col>
      
      </Row>
      </Container>
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
      <div >
        {cards/* <Container fluid>
          <Row>
            <Col sm={10}><h4 align='right' style={{paddingRight:'120px'}}> Sentiment</h4></Col>
            <Col sm={2}><h4 align='right' style={{paddingRight:'120px'}}> Comments</h4></Col>
          </Row>
          <Row>
            <Col sm={10} className="thread-page-content">
              {cards}</Col>
            <Col sm={2}><CommentCol {...articles[index]}/></Col>
          </Row>
        </Container> */}
      </div>
      </div>

  );
}


