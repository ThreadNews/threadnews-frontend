import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Nav'
import  axios from 'axios';
import {Container, Row, Col, Toast, CardColumns} from 'react-bootstrap'
import {useState, useEffect,useRef} from 'react'
import { ArticleToast } from './ArticleToast'
export function ThreadPage(props){
    
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
        axios.get('http://127.0.0.1:5000/theads/Health/t').then( result => {
      if (result){
            console.log("ART:",result.data.articles[0].source)
            
            setArticles(sampleSize(result.data.articles.slice(),20));

      }
    })
    }, [] )


    function remove_article(id){
        console.log("removing with id")
        let rm = articles.find(obj => obj.id === id);
        let n = articles.filter(item=> item!==rm)
        setArticles(n)
        //update on db

    }

    function like_article(articleId){
        let result = axios.post(`http://127.0.0.1:5000/liked_article/${props.user.user_id}/${articleId}`)
        // props.user.user_id()
    }


    const toasts = articles.slice(0,20).map((data, i) => {
		return <ArticleToast {...data} key={i} 
            removeArticle={remove_article}
            likeArticle={like_article}
            />
    });
    
    return(
        <div> 
            <Navbar></Navbar>
                    {toasts}
        </div>
)
    
}

ThreadPage.defaultProps ={
    user: {"user_id":"5ecc439c-6ed0-11eb-a6f4-acde48001122",
        "username":"test username",
        "first_name":"first_name",
        "last_name":"last_name",
        "email":"testuser@gmail.com",
        "interests":["Economics","Sports","Pop Culture","Beauty","Fitness","Architcture"]
    }
}
