/**
 * represents search bar component
 * contains input field and button
 * after search user is dirrected to search results page
 *
 * @summary Searchbar component
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:24:42
 * Last modified  : 2021-06-08 22:37:38
 */

//react imports
import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
//css imports
import "../css/search.css";
import { LinkContainer } from "react-router-bootstrap";

// requre env variables
require("dotenv").config();

export function SearchBar(props) {
  const [search_string, setSearchstring] = useState("");
  const [user_ids, set_user_ids] = useState([]);

  function search_user(search_string) {
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    let data = { user_name: search_string };
    //not currently implemented on backend going to fix
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/search_user", data, head)
      .then((result) => {
        if (result) {
          // console.log("finished searching user", result);
          if (result.status === 200) {
            console.log("t1", result.data.users);
            set_user_ids(result.data.users);
            console.log("USER ids", user_ids);
          } else {
            console.log("ERROR");
          }
        }
      })
      .catch(function (error) {
        console.log("error");
        console.log("search string", search_string);
      });
  }

  return (
    <div className="search">
      <form>
        <input
          className="search_input"
          type="search"
          placeholder="       Username..."
          onChange={(v) => setSearchstring(v.target.value)}
        ></input>
        <LinkContainer to={"/searchresults/" + search_string}>
          <Button
            variant="secondary"
            className="submit"

            // onClick={() => search_user(search_string)}
          >
            search
          </Button>
        </LinkContainer>
      </form>
    </div>
  );
}
