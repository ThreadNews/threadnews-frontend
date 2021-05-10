import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Nav";
import axios from "axios";
import { Container, Row, Col,Form, Toast, CardColumns,Badge,Button,div, FormGroup } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./ArticleCard";
import {ThreadInfo} from "./ThreadInfo.js"
import { SentimentCard } from "./SentimentCard.js";
import "./css/ThreadPage.css";
import { CommentCol } from "./CommentCol";
export function ThreadPage(props) {
  const [index, setIndex] = useState(0);
  const [interests, setInterests] = useState(0);

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

    function get_interest_thread(interest){
      axios.post(`http://127.0.0.1:5000/threads/${interest}/a`).then( result => {
      if (result){
            setArticles(sampleSize(result.data.articles.slice(),20));
      }
    })
    }


  function remove_article(id) {
    console.log("removing with id");
    let rm = articles.find((obj) => obj.id === id);
    let n = articles.filter((item) => item !== rm);
    setArticles(n);
    //update on db
  }

  const interest_ls = ["DIY","Science","Investing","Startups"]
  const varients = ['primary','secondary','warning','info']
  const pills = interest_ls.map((data, i) => {
    return (
      // <div>

        <Badge style={{paddingLeft:'10px'}}
          pill variant={varients[i]}
          onClick={console.log("hh")}
          >
          {data}
        </Badge>
      // </div>
    );
  });


    function like_article(articleId){
      let token = sessionStorage.getItem('access_token')
      let data = {action:'add',article_id:articleId}
      let head = {headers:{Authorization:"Bearer "+ token}}
      let result = axios.post('http://127.0.0.1:5000/like',data,head)
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
      <Container>
      <Row>
        <Col xs={12} >
      <ArticleCard 
        {...data}
        key={i}
        i = {i}
        removeArticle={remove_article}
        likeArticle={like_article}
        set_thread = {select_article}
      />
      <SentimentCard
      {...data}
      key={i}
      style={{position:'left',}}
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
    <div class="container profile profile-view" id="profile">
    <Form>
        <div class="form-row profile-row">
            <Col md={4}  /* style="background: var(--white);border-color: var(--white);" */>
                <div class="avatar">
                    <div class="avatar-bg center" s/* tyle="color: var(--blue);background: linear-gradient(var(--blue), white), linear-gradient(black, white), linear-gradient(black, white), var(--blue);" */></div>
                <div><input class="form-control-file form-control" type="file" name="avatar-file" /* style="border-color: var(--white);padding: 30px 12px;" *//></div>
                </div>
            </Col>
            <Col md={8}>
                <h1>Profile </h1>
                <hr /* style="border-color: var(--white);" *//>
                    
                <div class="form-row">
                    <Col sm={12} md={6}>
                        <div class="form-group"><label>Firstname </label><input class="form-control" type="text" name="firstname"/></div>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup class="form-group"><label>Lastname </label><input class="form-control" type="text" name="lastname"/></FormGroup>
                    </Col>
                </div>
                <FormGroup><label>Email</label><input class="form-control" type="email" autocomplete="off" required="" name="email"/></FormGroup>
                <div class="form-row">
                    <Col sm={12} md={6}>
                        <FormGroup><label>Password </label><input class="form-control" type="password" name="password" autocomplete="off" required=""/></FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup><label>Confirm Password</label><input class="form-control" type="password" name="confirmpass" autocomplete="off" required=""/></FormGroup>
                    </Col>
                </div>
                <hr /* style="border-color: var(--white);" *//>
                <div class="form-row">
                    <div class="col-md-12 content-right"><button class="btn btn-primary form-btn" type="submit">Update </button><button class="btn btn-danger form-btn" type="reset">Cancle </button></div>
                </div>
            </Col>
            <Col md={8} /* style="border-color: var(--white);" */>
                <hr /* style="border-color: var(--white);" *//>
            </Col>
        </div>
    </Form>
    </div>
  );
}


