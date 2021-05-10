
import CategoryBubbleSet from './category-bubbles'
import './css/App.css';
import './css/bootstrap_theme.css';
import React from "react";
import Sidebar from './Sidebar';
import {Container, Row, Col,} from 'react-bootstrap';


class InterestPage extends React.Component {

  constructor(){
    super();
    this.state = {interests:[],num:0,topics:[],bub:[]}
    this.add_interest = this.add_interest.bind(this);
    this.remove_interest = this.remove_interest.bind(this);
   
  }

  
  add_interest(new_interest){
    let interests = this.state.interests;
    let n =[...interests,new_interest];
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

  render() {  
    return (
      <div className="App" width='100%'>
        <div style = {{paddingTop:'40px',borderRadius:'30px',alignItems:'center'}}>
          <h2>Welcome to Thread-News</h2>
          <hr style={{width:'40%'}}></hr>
          <h4>Please select some topics to get started</h4>
        </div>
        <Container >
          <Row >
            <Col xs={{span:7,offset:2}} className=""> 
              <div className="bubbles">
                <CategoryBubbleSet
                  add_interest={this.add_interest}
                  interests={this.state.interests}
                  topics = {this.state.topics}
                  className="bubbles"
                />
                </div>
            </Col>
            
            <Col xs={"2"}>
              <Sidebar 
                num = {this.state.num}
                interests = {this.state.interests}
                remove_interest = {this.remove_interest}
                >
                </Sidebar >
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default InterestPage;
