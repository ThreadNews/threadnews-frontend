import { extend } from "jquery";
import App from './App';
import React from 'react';
import {useState, useEffect,useRef} from 'react'

// import './css/bootstrap_theme.css';

import Card from 'react-bootstrap/Card';
import {primary_color, secondary_color} from './Colors'
import Button from "react-bootstrap/Button";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import {Redirect} from 'react-router-dom';

export function FollowUserList(props){

    function get_user_info(){
        let = users={
            user_name:'username',
            first_name:'first',
            last_name:'last'

        }

    }


    return(
        <div>
            <ListGroup variant="flush" style={{borderRadius:'20px'}}>
                    {
                    props.id_list.map(user_data => (
                         <ListGroup.Item variant="light" >
                             {interest}
                             <Button size="sm" style={{float: 'right',borderRadius:'70px'}} variant='danger' onClick = {()=>props.follow_user(user_data.user_id)}>x</Button>
                        </ListGroup.Item>))}
                </ListGroup>
        </div>
    )
}