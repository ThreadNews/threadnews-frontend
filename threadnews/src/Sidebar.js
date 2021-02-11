import { extend } from "jquery";
import App from './App';
import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import './bootstrap_theme.css';
import './sidebar.css';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics : [],
            channels : [],
            num : 0

        };
    }
    


    render(){
        let num = 0;
       return (
           <div>
           <Card
                bg="Warning" 
                style = {{width:'20rem',paddingTop:'30px'}}
            >
               <Card.Body>
                   <p className={"sidebarHeader"}>hello</p>
                   {/* <Card.Title className="sidebarHeader">Progress</Card.Title> */}
                   <Card.Subtitle>please select x more</Card.Subtitle>
                    <ProgressBar 
                        progress={11/8 *100}
                        radius={100}
                        strokeColor="#93E38B"
                    >
                        <div className="indicator">
                            <div>{this.state.num}/8</div>
                        </div>
                    </ProgressBar>
                    <Button variant={this.num<8 ? "outline-success": "Success" } size ="lg" >
                        Continue
                    </Button>
                </Card.Body>
            </Card></div>
       )
    }
}

export default Sidebar;