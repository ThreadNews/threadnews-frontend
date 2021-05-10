import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import { Container} from "react-bootstrap";
import './css/SocialCol.css';
import {UserBlockList} from './UserBlock'
export function SocialCol(props){

    let token = sessionStorage.getItem('access_token');
    let data = {N:10,following:''};
    let head = {headers:{Authorization:"Bearer "+ token}}
    let ids = JSON.parse(sessionStorage.getItem('suggested_follows'))
    const [users, setUsers] = useState([]);
    
    useEffect(()=> {
        if (ids===undefined || ids.length===0) {
            return null
        }
    
        axios.post("http://127.0.0.1:5000/reccomended_follows",data,head).then( result => {
      if (result){

            setUsers(result.data.result);
            console.log(result.data.result)
            return result['result']
      }
    })
    }, [] )


    
    
    return(
        users===props.user_ids? <div></div> :
    <div>
        <Container>
        {/* <h3>Users to follow</h3> */}
        <UserBlockList user_ids={ids} header="Suggested follows"/>
        </Container>
    </div>);
}