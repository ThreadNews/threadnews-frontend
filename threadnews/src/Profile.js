import React from 'react';
import { Card, Row, Col, Container, Nav, Tab,Tabs} from 'react-bootstrap';
import Navbar from './Nav';
import './css/profile.css'
export default function Profile(props){
    // remember to implement later for now passing user as prop
    // let user = localStorage.getItem('user')
    let user = props
    return (
        <div>
            <Navbar></Navbar>
            <Container  style={{padding:'20px'}}>
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
            </Container>
        </div>
    )

}