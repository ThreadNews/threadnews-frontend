import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Nav";
import axios from "axios";
import { Container, Row, Col, Toast, CardColumns,Badge,Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./ArticleCard";
import {ThreadInfo} from "./ThreadInfo.js"
import { SentimentCard } from "./SentimentCard.js";
import "./css/ThreadPage.css";
import { CommentCol } from "./CommentCol";
import {SocialCol} from './SocialCol';
import { LinkContainer } from "react-router-bootstrap";
import {get_user} from "./LocalStorageHelper";
import {UserBlockList} from "./UserBlock"


export function ThreadPage(props) {
  const [index, setIndex] = useState(0);
  const [interests, setInterests] = useState(0);

  const sampleSize = ([...arr], n = 1) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return m.slice(0, n);
  };
  
    const [articles, setArticles] = useState([]);
    
    useEffect(()=> {
        let token = sessionStorage.getItem('access_token');
        // let data = {user_id:user_id,action:'follow'};
        let head = {headers:{Authorization:"Bearer "+ token}}
        let topic = window.location.href==="http://127.0.0.1:5000/threads"? '' : window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        console.log(window.location.href)
        let data = {topic:topic, n:10}
        axios.post('http://127.0.0.1:5000/threads',data,head).then( result => {
      if (result){
            setArticles(result.data.articles.slice(0, 20));
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

  const interest_ls = ["DIY","Sports","Investing","Crypto"]
  const varients = ['primary','secondary','warning','info']
  const pills = interest_ls.map((data, i) => {
    return (
      // <div>
      <LinkContainer to={`/threads/${data}`}>
        <Badge style={{paddingLeft:'10px'}}
          pill variant={varients[i]}
          
          >
          {data}
        </Badge>
        </LinkContainer>
      
    );
  });



  function get_pills(){
    // let token = sessionStorage.getItem('access_token')
    // let data = {action:'interests'}
    // let head = {headers:{Authorization:"Bearer "+ token}}

    // axios.post('http://127.0.0.1:5000/interests',data,head).then( result => {
    //   if (result){
    //         setInterests(result);
    //         console.log(result)
            
    //   }
    // })
    return(
      <div>{pills}</div>
    )
  }


    
  function select_article(i){
    if (i>=0){
      setIndex(i)
      console.log("Selected Article",i)
    }
  }

  // const reccomended = <SocialCol/>
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

        set_thread = {select_article}
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


  let user = get_user()
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div >
        <Container fluid>
          <h4 align={'center'}>Your Liked Topics</h4>
          <h3 align={'center'}>
            {get_pills()}
          </h3>
          <Row>
            {/* <Col sm={10}><h4 align='right' style={{paddingRight:'120px'}}> Sentiment</h4></Col>
            <Col sm={2}><h4 align='right' style={{paddingRight:'120px'}}> Comments</h4></Col> */}
          </Row>
          <Row>
            <Col sm={10} className="thread-page-content">
              {cards}</Col>
            {/* <Col sm={2}><CommentCol {...articles[index]}/></Col> */}
            <Col sm={2}><UserBlockList {...user.following}/></Col>
          </Row>
        </Container> 
      </div>
      </div>

  );
}


