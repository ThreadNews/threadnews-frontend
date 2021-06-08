/**
 * profile page, shows users followers/following and reposted articles
 * also contains links to the topics that the user has saved
 *
 * @summary Profile page
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:49:23 
 * Last modified  : 2021-05-29 15:32:23
 */


import { React, useState, useEffect } from "react";
import { Row, Col, Container, Tab, Tabs, Button } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Nav";
import "../css/profile.css";
import { UserBlockList } from "../components/UserBlock";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { ArticleCard } from "../components/ArticleCard";
import { get_user } from "../functions/LocalStorageHelper";


//used to import env variables for frontend and backend urls
require("dotenv").config();

export default function Profile(props) {
  let user = get_user(); 

  //key state var stores what tab the user is viewing
  const [key, setKey] = useState("home");
  const [articles, setArticles] = useState([""]);

  useEffect(() => {
    //loads liked article data for user
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    let data = { ids: user.liked_articles };
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/articles",
        data,
        head
      )
      .then((result) => {
        if (result) {
          setArticles(result.data.result);
        }
      });
  }, []);


  //creates list of user interests on left side of page 
  const interest_list = user.interests.map((interest, i) => {
    return (
      <div>
        <ListGroup.Item variant="light" key={i}>
          {interest}
          <Button
            href={`/threads/${interest}`}
            size="sm"
            style={{ float: "right", borderRadius: "70px" }}
            variant="info"
          >
            View
          </Button>
        </ListGroup.Item>
      </div>
    );
  });

  const articleCards = articles.map((article, i) => {
    return (
      <div>
        <ArticleCard article={article} key={i} />
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
              <Col md={3}>
                <div className="profile-img">
                  <div className="profile-img-wrapper">
                    <img src={user.profile_img} alt="" />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="profile-head-text">
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                  <h6>{user.bio}</h6>
                  <p className="social">
                    Followers :{" "}
                    <span className="counter">{user.follower_count}</span>
                    Following :{" "}
                    <span className="counter">{user.following_count}</span>
                    Articles Shared :{" "}
                    <span className="counter">{user.following_count}</span>
                    Likes : <span className="counter">{user.likes_count}</span>
                  </p>
                </div>
              </Col>
              <Col md={2}>
                <LinkContainer to="/editprofile/">
                  <input
                    type="submit"
                    className="profile-edit-btn"
                    href="/editprofile"
                    name="btnAddMore"
                    value="Edit Profile"
                  />
                </LinkContainer>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <div className="profile-work">
                  <br></br>
                  <h4>Interests</h4>
                  <ListGroup>{interest_list}</ListGroup>
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
                        <UserBlockList {...user.followers} header="Followers" />
                      </Col>
                      <Col>
                        <UserBlockList
                          user_ids={user.following}
                          header="Following"
                        />
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
  );
}
