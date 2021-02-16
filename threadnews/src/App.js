
import CategoryBubbleSet from './category-bubbles'
import './css/App.css';
import  axios from 'axios';
import Top_nav from './Nav';
import './css/bootstrap_theme.css';
import React from "react";
import TopicBubble from './TopicBubble'
import {useState, useEffect,useRef} from 'react'
import Sidebar from './Sidebar';
import {Container, Row, Col,} from 'react-bootstrap';
import { render } from 'react-dom';

// import "Welcome.css";
//import Navbar from 'react-bootstrap/Navbar';
const test_data = [{"name":"policy","backgroundColor":"#EE1B2D","textColor": "white"}]
//function NavBar() {}



class App extends React.Component {

  constructor(){
    super();
    this.state = {interests:[],num:0,topics:[],bub:[]}
    this.add_interest = this.add_interest.bind(this);
    this.remove_interest = this.remove_interest.bind(this);
   
  }

  
  add_interest(new_interest){
    let interests = this.state.interests;
    let n =[...interests,new_interest];
    // this.state.interests = n;
    //console.log(this.state.interests);
    this.setState({interests:n, num: this.state.num + 1,});
    console.log('num:', this.state.num);
    
  }


  remove_interest(old_interest){
    let n = this.state.interests;
    n = n.filter(interest => !(interest===old_interest));
    console.log('Removed:', old_interest)
    console.log("remaining", n)
    this.setState({interests:n, num: this.state.num - 1,topics:this.state.topics});
  }


  //let bubble_data = fetch_category_bubble_data()
  //console.log(bubble_data)
  render() {  
    
    return (
      <div className="App" width='100%'>
        <Top_nav/>
        <Container >
          <Row>
            <Col sm ={9}> 
              {/* { CategoryBubbleSet({
                // interests:interests,
                add_interest: this.add_interest,
                interests:this.interests
              })} */}
                <CategoryBubbleSet
                  add_interest={this.add_interest}
                  interests={this.state.interests}
                  topics = {this.state.topics}
                  
                  
                />
            </Col>
            
            <Col sm={2}>
              <Sidebar 
                num = {this.state.num}
                interests = {this.state.interests}
                remove_interest = {this.remove_interest}
                onClick={this.props.onFinish}
                >
                  
                </Sidebar >
            </Col>
          </Row>
        </Container>
        <header className="App-header" width='100%'>
          {/* <p style = 'textAlign:left'>
            Welcome to ThreadNews
          </p> */}
          
          {/* <p className="welcome">Welcom to ThreadNews!</p> */}
          <p style={{
                color: "white",
                fontSize: 32,
                marginBottom: 5,
                opacity: 0.4}}>
            Lets get you started, Please select topics that interest you 
          </p>
          
          
        </header>
      </div>
    );
  }
}

export default App;
