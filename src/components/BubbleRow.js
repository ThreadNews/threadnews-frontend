/**
 * used in the user interest page
 * also used for users to switch between topics on threadpage
 *
 * @summary circle that contains text and of topic
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:40:14 
 * Last modified  : 2021-05-28 10:41:05
 */

//react imports
import React from "react";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//component imports
import TopicBubble from "../components/TopicBubble";
//css imports
import "../css/BubbleRow.css";

export default function BubbleRow(props) {
  const bubbles = props.interests.map((topic, i) => {
    return (
      <div className="topicBubbleContainer" key={i}>
        <LinkContainer to={`/threads/${topic}`}>
          <TopicBubble topic={topic} key={i} className="topicBubble" />
        </LinkContainer>
      </div>
    );
  });

  return (
    <div className="bubbleRow">
      <h3 className="headerText">{props.header}</h3>
      <Col>
        <Row>{bubbles}</Row>
      </Col>
    </div>
  );
}
