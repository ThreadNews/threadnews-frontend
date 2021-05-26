import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
//css imports
import "../css/SocialCol.css";
//built component imports
import { UserBlockList } from "../components/UserBlock";

//function imports
import { get_users } from "../functions/Social.js";

export function SocialCol(props) {
  let token = sessionStorage.getItem("access_token");
  let data = { N: 10, following: "" };
  let head = { headers: { Authorization: "Bearer " + token } };
  let ids = JSON.parse(sessionStorage.getItem("suggested_follows"));
  console.log("IDS: ", ids);
  
  return (
    <Container>
      <UserBlockList user_ids={ids} header="Suggested follows"/>
    </Container>
  );
}
