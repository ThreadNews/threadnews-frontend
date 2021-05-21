//react imports
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//component imports
import TopicBubble from "../components/TopicBubble";
//css imports
import "../css/BubbleRow.css";

export default function BubbleRow(props) {
  const bubbles = props.interests.map((topic, i) => {
    return (
      <div className="topicBubbleContainer">
        <LinkContainer to={`/threads/${topic}`}>
          <TopicBubble topic={topic} key={i} className="topicBubble" />
        </LinkContainer>
      </div>
    );
  });

  return (
    <div className="bubbleRow">
      <Container className="bubbleRow">
        <h3>{props.header}</h3>
        <Col>
          <Row>{bubbles}</Row>
        </Col>
      </Container>
    </div>
  );
}
