/**
 * rounded sidebar on right side of page where user selects image
 * contains list of selected interests that can also be removed
 *shows donut chart indicating the users progress implemented from charts.js
 * 
 * @summary Interest page sidebar
 * @author Thread News
 *
 * Created at     : 2021-05-28 04:38:39 
 * Last modified  : 2021-05-28 04:40:23
 */

//react imports
import React from "react";
import {Button,Card,ListGroup} from "react-bootstrap";
import ProgressBar from "react-customizable-progressbar";
import { primary_color } from "../Colors";
import axios from "axios";
//css imports
import "../css/sidebar.css";
import "../css/bootstrap_theme.css";


require("dotenv").config();

export function Sidebar(props) {
  function update_user_interests() {
    axios.post(process.env.REACT_APP_BACKEND_URL + "/update_interests", {
      user_id: "test user id",
      new_interests: props.interests,
    });
    console.log("updated user interests");

  }

  return (
    <div style={{ paddingTop: "30px", alignItems: "center" }}>
      <Card
        style={{
          width: "20rem",
          paddingTop: "20px",
          borderRadius: "30px",
          alignItems: "center",
        }}
      >
        <Card.Title className="sidebarHeader">
          please select {5 - props.num<1?0:5 - props.num<1} more
        </Card.Title>

        <Card.Body>
          <hr></hr>
          <Card.Subtitle>
            please select {5 - props.num < 0 ? 0 : 5 - props.num} more
          </Card.Subtitle>
          <ProgressBar
            progress={(props.num / 5) * 100>=100?100:(props.num / 5) * 100}
            radius={100}
            strokeColor={primary_color}
          >
            <div className="indicator">{props.num}/5</div>
          </ProgressBar>

          <Button
            variant={props.num < 5 ? "outline-warning" : "outline-success"}
            disabled={props.num < 5 ? true : false}
            onClick={update_user_interests}
            href="/threads/"
            hidden={props.num < 5}
            size="lg"
          >
            Continue
          </Button>
          <ListGroup variant="flush" style={{ borderRadius: "20px" }}>
            {props.interests.map((interest) => (
              <ListGroup.Item variant="light">
                {interest}
                <Button
                  size="sm"
                  style={{ float: "right", borderRadius: "70px" }}
                  variant="danger"
                  onClick={() => props.remove_interest(interest)}
                >
                  x
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Sidebar;
