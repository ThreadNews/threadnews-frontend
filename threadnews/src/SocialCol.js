import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col,ListGroup,Button } from "react-bootstrap";
import './css/SocialCol.css';
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
        {/* <ListGroup variant="flush" style={{borderRadius:'20px'}}>
            {users.map(user => (
                    <ListGroup.Item variant="light" >
                        @{user.user_name}
                        <Button size="sm" style={{float: 'right',borderRadius:'70px'}} variant='info' onClick = {()=>follow(user.user_id)}>Follow</Button>
                </ListGroup.Item>))}
        </ListGroup> */}

        <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-3">
                <div class="d-flex align-items-center">
                    <div class="image"> <img src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"} class="rounded" width="155"/> </div>
                    <div class="ml-3 w-100">
                        <h4 class="mb-0 mt-0">Alex Morrision</h4> <span>Senior Journalist</span>
                        <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div class="d-flex flex-column"> <span class="articles">Articles</span> <span class="number1">38</span> </div>
                            <div class="d-flex flex-column"> <span class="followers">Followers</span> <span class="number2">980</span> </div>
                            <div class="d-flex flex-column"> <span class="rating">Rating</span> <span class="number3">8.9</span> </div>
                        </div>
                        <div class="button mt-2 d-flex flex-row align-items-center"> <button class="btn btn-sm btn-outline-primary w-100">Chat</button> <button class="btn btn-sm btn-primary w-100 ml-2">Follow</button> </div>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    </div>);
}