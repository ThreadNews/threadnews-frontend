import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-customizable-progressbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { primary_color } from "../Colors";
//css imports
import "../css/sidebar.css";
import "../css/bootstrap_theme.css";
import {update_user_interests} from '..functions/Social.js';

require("dotenv").config();

// creates component that is shown on the side of page where user selects interests
// shows donut graph and lists selected interests and user can remove interests
// once enough topics choosen user can continue
export function Sidebar(props) {
  
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
            Interests
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
