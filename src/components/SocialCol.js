/**
 * creates container that is displayed in left side of news page
 * uses UserBlockList componenent to show "suggested follows"
 * 
 * @summary Social Column 
 * @author Thread News
 *
 * Created at     : 2021-05-28 04:37:26 
 * Last modified  : 2021-05-28 09:49:02
 */

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
