import React from 'react';
import { Card, Row, Col, Container, Nav, Tab,Tabs,CardDeck} from 'react-bootstrap';
import Navbar from './Nav';
import './css/profile.css';
import {LinkContainer} from 'react-router-bootstrap'
export default function Profile(props){
    // remember to implement later for now passing user as prop
    // let user = localStorage.getItem('user')
    let user ={
        user_id: "complex",
        username: "elon-the-musker",
        first_name: "Elon",
        last_name: "Musk",
        email: 'elongate@gmail.com',
        interests: ['cars','crypto','space','e-girls'],
        profile_img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.insider.com%2F5fd3e725e00bce00188baf80%3Fwidth%3D700&imgrefurl=https%3A%2F%2Fwww.businessinsider.com%2Felon-musk-net-worth-quintupled-2020-explained-charts-tesla-spacex-2020-12&tbnid=0N8p6VObK26AwM&vet=12ahUKEwjq5tqw2JfwAhXZkksFHV-TA7MQMygLegUIARDnAQ..i&docid=ftYddqORvZt8qM&w=700&h=487&q=elon%20musk&ved=2ahUKEwjq5tqw2JfwAhXZkksFHV-TA7MQMygLegUIARDnAQ",
        bio: "i like trains no wait cars, yes i like cars",
        follower_count:10,
        following_count:20}
    return (
        <div>
            <Navbar></Navbar>
            <Container className="profile-container">
            <div className="container emp-profile">
            <form method="post">
                <Row>
                    <Col md={2} >
                        <div class="profile-img">
                            <div class ="profile-img-wrapper">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div class="profile-head">
                                    <h3>
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <h6>
                                        Web Developer and Designer
                                    </h6>
                                    <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={2}>
                        
                        <LinkContainer to='/editprofile'>
                            <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" href={'/editprofile'}/>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div class="profile-work">
                            <p>Recent Activity</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>Interests</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <Row>
                                            <Col md={6}>
                                                <label>User Id</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>Kshiti123</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Name</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>Kshiti Ghelani</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Email</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>kshitighelani@gmail.com</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Phone</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>123 456 7890</p>
                                            </Col>
                                        </Row>
                                        <Col>
                                            <Col md={6}>
                                                <label>Profession</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>Web Developer and Designer</p>
                                            </Col>
                                        </Col>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <Row>
                                            <Col md={6}>
                                                <label>Experience</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>Expert</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Hourly Rate</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>10$/hr</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Total Projects</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>230</p>
                                            </Col>
                                        </Row>
                                        <div class="row">
                                            <Col md={6}>
                                                <label>English Level</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>Expert</p>
                                            </Col>
                                        </div>
                                        <Row>
                                            <Col md={6}>
                                                <label>Availability</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>6 months</p>
                                            </Col>
                                        </Row>
                                <Row>
                                    <Col md={12}>
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </form>
                       
        </div>
        </Container>



            {/* <Container  style={{padding:'20px'}}>
            <Row >
                <Card className='profileCard' pad='6px'>
                    <Container>
                        <Row>
                        <Col sm={2}>
                            <div className='profileImage'>
                                <img src={user.profile_img} pad='10px'/>
                            </div>
                        </Col>
                        
                        <Col align='left'>
                                <h3 className='profileName'>{user.first_name} {user.last_name} </h3>

                                <h4 style={{paddingLeft:'30px'}} className="mb-2 text-muted">@{user.username}</h4>
                                <hr className = "divider"></hr>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}
                                        {user.bio}{' '}
                                    </p>
                                </blockquote>
                        </Col>
                        </Row>
                    </Container>
                </Card>
                

            </Row>

            </Container>
            <Row style={{align:'center'}}>
                <p className='overview'>Saved Articles</p>
                

            </Row>

            <Container>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://specials-images.forbesimg.com/imageserve/604d30c42fd16a5914334230/960x0.jpg?fit=scale" />
                    <Card.Body>
                        <Card.Title>As The Bitcoin Price Blasts Through $60,000, Tesla Billionaire Elon Musk Is More Concerned With ‘Joke’ Bitcoin Rival Dogecoin</Card.Title>
                        <Card.Link href="https://www.forbes.com/sites/billybambrough/2021/03/13/as-the-bitcoin-price-blasts-through-60000-tesla-billionaire-elon-musk-is-more-concerned-with-joke-bitcoin-rival-dogecoin/?sh=18a19c63026c">View Full Article</Card.Link>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.sanluisobispo.com/latest-news/jy6j7y/picture248954979/alternates/FREE_768/Covid%20Vaccination1" />
                    <Card.Body>
                        <Card.Title>SLO County opens COVID vaccines to another 40,000 people. Here’s who can sign up</Card.Title>
                        <Card.Link href="https://www.sanluisobispo.com/news/coronavirus/article249845463.html">View Full Article</Card.Link>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/DFE9/production/_117412375_techtent-chips.jpg" />
                    <Card.Body>
                        <Card.Title>Tech Tent: The new 'space race' for computer chips</Card.Title>
                        <Card.Link href="https://www.bbc.com/news/technology-56294493">View Full Article</Card.Link>
                    </Card.Body>
                </Card>
            </CardDeck>
            </Container> */}
        </div>
    )

}