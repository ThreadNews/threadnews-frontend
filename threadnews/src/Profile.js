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
            <Container>
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
                <p className='overview'>Profile Overview</p>
                <hr className = "divider2"></hr>

            </Row>
            <Container    >
                {/* <Row> */}
                    <Card style={{boarderRadius:'60px'}}>
                    <Tabs>
                        <Tab title='Liked articles'></Tab>
                    </Tabs>
                    </Card>
                {/* </Row> */}
            </Container>
        </div>
    )

}