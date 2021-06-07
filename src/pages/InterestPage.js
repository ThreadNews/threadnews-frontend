/**
 * page is for users visiting site for the first time
 * prompts the user to select interests which are saved in localstorage 
 * im
 * @summary short description for the file
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:28:53 
 * Last modified  : 2021-05-28 10:29:27
 */

import CategoryBubbleSet from "../components/category-bubbles";
import "../css/App.css";
import "../css/bootstrap_theme.css";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

export default function InterestPage(props) {
  const [interests, setInterests] = useState([]);

  function add_interest(new_interest) {
    let n = [...interests, new_interest];
    setInterests(n);
  }

  function remove_interest(old_interest) {
    let n = interests;
    n = n.filter((interest) => !(interest === old_interest));
    console.log("Removed:", old_interest);
    console.log("remaining", n);
    setInterests(n);
  }

  return (
    <div className="App" width="100%">
      <div
        style={{
          paddingTop: "40px",
          borderRadius: "30px",
          alignItems: "center",
        }}
      >
        <h2>Welcome to Thread-News</h2>
        <hr style={{ width: "40%" }}></hr>
        <h4>Please select some topics to get started</h4>
      </div>
      <Container>
        <Row>
          <Col xs={{ span: 7, offset: 2 }} className="">
            <div className="bubbles">
              <CategoryBubbleSet
                add_interest={add_interest}
                interests={interests}
                topics={props.topics}
                className="bubbles"
              />
            </div>
          </Col>

          <Col xs={"2"}>
            <Sidebar
              num={interests.length}
              interests={interests}
              remove_interest={remove_interest}
            ></Sidebar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
