/**
 * navigated to with the button next to the search feild on the navBar
 * implements our component UserBlock to show the results
 *
 * @summary shows results from user search
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:21:53 
 * Last modified  : 2021-06-08 22:40:12
 */

import React, { useState, useEffect } from "react";
import { search_users } from "../functions/Social";
import { UserBlock } from "../components/UserBlock";
import {Container,Row,Col} from 'react-bootstrap';

export function SearchResults(props) {
  const [searchResults, setResults] = useState([]);
  let search_input =
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
      .length === 0
      ? ""
      : window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1
        );
  useEffect(() => {
    search_users(search_input).then((result) => {
      if (result) {
        console.log("YEs", result);
        let blocks = result.data.users.map((user, i) => {
          return <UserBlock {...user} key={i}></UserBlock>;
        });
        setResults(blocks);
      }
    });
  }, []);

  return (
  <div>
      <h2 className="title-light">Search Results</h2>
      <Container>
        <Row>
          <Col xs = {4}>
          {searchResults}
          </Col>
        </Row>
      </Container>          
  </div>);
}
