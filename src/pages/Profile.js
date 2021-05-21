import {React,useState,useEffect} from 'react';
import {Row, Col, Container,Tab,Tabs,Button} from 'react-bootstrap';
import axios from "axios";
import Navbar from './Nav';
import './css/profile.css'
import {UserBlockList} from './UserBlock'
import ListGroup from 'react-bootstrap/ListGroup'
import {LinkContainer} from 'react-router-bootstrap'
import {ArticleCard} from './ArticleCard'
require('dotenv').config()
export default function Profile(props){
    
    let user = localStorage.getItem('user')

    const [key, setKey] = useState('home');
    // const [articles, setArticles] = useState([]);
    const [articleCards,setArticleCards] = useState(null);

    
    useEffect(()=> {
        let token = sessionStorage.getItem('access_token');
        // let data = {user_id:user_id,action:'follow'};
        let head = {headers:{Authorization:"Bearer "+ token}}
        axios.post(process.env.REACT_APP_BACKEND_URL+ '/articles',{article_ids:user.reposted_articles},head).then( result => {
      if (result){
            // setArticles(result.data.result.slice(0, 10));
            let articleCards_temp = result.data.result.map((article, i) => {
                return (
                    <div>
                        <ArticleCard {...article}/>
                    </div>
                );
            })
            setArticleCards(articleCards_temp);
            // create_article_cards()
      }
    })
    }, [] )

    const interest_list = user.interests.map((interest, i) => {

        return (
            <div>
                <ListGroup.Item variant="light"  key={i}>
                             {interest}
                             <Button href={`/threads/${interest}`} size="sm" style={{float: 'right',borderRadius:'70px'}} variant='info' >View</Button>
                </ListGroup.Item>
            </div>
        );
      });

    return (
        <div>
            <Navbar></Navbar>
            <Container className="profile-container">
            <Container className="profile">
            <form method="post">
                <Row>
                    <Col md={3} >
                        <div className="profile-img">
                            <div className ="profile-img-wrapper">
                                <img src={user.profile_img} alt=""/>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="profile-head-text">
                                    <h3>
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <h6>
                                        {user.bio}
                                    </h6>
                                    <p className="social">
                                        Followers : <span className="counter">{user.follower_count}</span>
                                        Following : <span className="counter">{user.following_count}</span>
                                        Articles Shared : <span className="counter">{user.following_count}</span>
                                        Likes : <span className="counter">{user.likes_count}</span>
                                    </p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <LinkContainer to='/editprofile/'>
                        <input type="submit" class="profile-edit-btn" href='/editprofile' name="btnAddMore" value="Edit Profile"/>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="profile-work">
                            <br></br>
                            <h4>Interests</h4>
                            <ListGroup>
                                {interest_list}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            >
                            <Tab eventKey="Reposted" title="Reposted Articles">
                                {articleCards}

                            </Tab>
                            <Tab eventKey="Social" title="Social">
                                <Row>
                                    <Col>
                                        
                                        <UserBlockList {...user.followers} header="Followers"/>
                                    </Col>
                                    <Col>
                                        {/* <h3> Following </h3> */}
                                        <UserBlockList {...user.following} header="Following"/>
                                    </Col>
                                </Row>
                            </Tab>
                            
                        </Tabs>
                       
                    </Col>
                </Row>
            </form>
                       
        </Container>
        </Container>
        </div>
    )

}