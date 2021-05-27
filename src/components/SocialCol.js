import React from "react";
import { Container } from "react-bootstrap";
//css imports
import "../css/SocialCol.css";
//built component imports
import { UserBlockList } from "../components/UserBlock";

export function SocialCol(props) {
  let ids = JSON.parse(sessionStorage.getItem("suggested_follows"));
  console.log("IDS: ", ids);
  
  return (
    <Container>
      <UserBlockList user_ids={ids} header="Suggested follows"/>
    </Container>
  );
}
