import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col,ListGroup,Button } from "react-bootstrap";

export function SocialCol(props){
    const [users, setUsers] = useState([]);

    // let token = sessionStorage.getItem('access_token');
    // let data = {N:10,following:''};
    // let head = {headers:{Authorization:"Bearer "+ token}}
    // axios.post("http://127.0.0.1:5000/reccomended_follows",data,head).then( result => {
    //   if (result){
    //         setUsers(result['result']);
    //   }
    // });

    return(
    <div>
        <Container>
        <h3>Users to follow</h3>
        <ListGroup variant="flush" style={{borderRadius:'20px'}}>
                    {
                    users.map(user => (
                         <ListGroup.Item variant="light" >
                             {user.user_name}
                             <Button size="sm" style={{float: 'right',borderRadius:'70px'}} variant='info' onClick = {()=>this.follow(user.user_id)}></Button>
                        </ListGroup.Item>))}
                </ListGroup>
        </Container>
    </div>);
}