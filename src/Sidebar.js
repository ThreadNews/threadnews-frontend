import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import './css/bootstrap_theme.css';
import './css/sidebar.css';
import Card from 'react-bootstrap/Card';
import {primary_color, secondary_color} from './Colors'
import Button from "react-bootstrap/Button";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import {Redirect} from 'react-router-dom';

require('dotenv').config()

export function Sidebar(props){

    function update_user_interests(){
        axios.post(process.env.REACT_APP_BACKEND_URL + '/update_interests',{user_id:"test user id", new_interests:props.interests})
        console.log("updated user interests")
        // props.onClick()
    }

    return (
        <div  style = {{paddingTop:'30px',alignItems:'center'}}>
        <Card
            style = {{width:'20rem',paddingTop:'20px',borderRadius:'30px',alignItems:'center'}}
        >
                <Card.Title className="sidebarHeader">please select {5 - props.num} more</Card.Title>

            <Card.Body>
                <hr></hr>
                <Card.Subtitle>please select {5-props.num<0?0:5-props.num} more</Card.Subtitle>
                <ProgressBar 
                    progress={props.num/5 * 100}
                    radius={100}
                    strokeColor={primary_color}
                >
                    <div className="indicator">
                        {props.num}/5
                    </div>
                </ProgressBar>
                
                <Button variant={props.num<5 ? "outline-warning": "outline-success" } 
                    disabled={props.num<5?true:false}
                    onClick={update_user_interests}
                    href="/threads"
                    hidden={props.num<5}
                    size ="lg" >
                    Continue
                </Button>
                <ListGroup variant="flush" style={{borderRadius:'20px'}}>
                    {
                    props.interests.map(interest => (
                         <ListGroup.Item variant="light" >
                             {interest}
                             <Button size="sm" style={{float: 'right',borderRadius:'70px'}} variant='danger' onClick = {()=>props.remove_interest(interest)}>x</Button>
                        </ListGroup.Item>))}
                </ListGroup>
            </Card.Body>
        </Card></div>
    )
}


export default Sidebar;