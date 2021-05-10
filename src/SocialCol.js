import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col,ListGroup,Button } from "react-bootstrap";
import './css/SocialCol.css';
import {UserBlock} from '../threadnews/src/UserBlock'
export function SocialCol(props){


    let token = sessionStorage.getItem('access_token');
    let data = {N:10,following:''};
    let head = {headers:{Authorization:"Bearer "+ token}}

    const [users, setUsers] = useState([]);
    
    useEffect(()=> {
        axios.post("http://127.0.0.1:5000/reccomended_follows",data,head).then( result => {
      if (result){

            setUsers(result.data.result);
            console.log(result.data.result)
            return result['result']
      }
    })
    }, [] )


    function follow(user_id){
        let token = sessionStorage.getItem('access_token');
        let data = {user_id:user_id,action:'follow'};
        let head = {headers:{Authorization:"Bearer "+ token}}
        axios.post("http://127.0.0.1:5000/follow_user",data,head);
    }

    return(
        users===undefined ? <div></div> :
    <div>
        <Container>
        <h3>Users to follow</h3>
        <UserBlock/>
        </Container>
    </div>);
}