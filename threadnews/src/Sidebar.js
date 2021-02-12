import { extend } from "jquery";
import App from './App';
import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import './css/bootstrap_theme.css';
import './css/sidebar.css';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

import ListGroup from 'react-bootstrap/ListGroup'


// class Sidebar extends React.Component {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         topics : [],
    //         channels : [],
    //         num : props.num
    //     };
    // }
    

export function Sidebar(props){
    console.log("so update", props.num)
    return (
        <div>
        <Card
            bg="Warning" 
            style = {{width:'20rem',paddingTop:'30px'}}
        >
            <Card.Body>
                
                <Card.Title className="sidebarHeader">Progress</Card.Title>
                <Card.Subtitle>please select {props.num-5} more</Card.Subtitle>
                <ProgressBar 
                    progress={props.num/5 * 100}
                    radius={100}
                    strokeColor="#93E38B"
                >
                    <div className="indicator">
                        {props.num}/8
                    </div>
                </ProgressBar>
                <Button variant={props.num<5 ? "outline-success": "Success" } size ="lg" >
                    Continue
                </Button>
                <ListGroup variant="flush">
                    {
                    props.interests.map(interest => (
                         <ListGroup.Item>
                             {interest}
                             <Button size="sm" style={{float: 'right'}} onClick = {()=>props.remove_interest(interest)}>Remove</Button>
                        </ListGroup.Item>))}
                </ListGroup>
            </Card.Body>
        </Card></div>
    )
}


export default Sidebar;