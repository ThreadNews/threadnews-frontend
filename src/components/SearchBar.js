import { Button, Row, Col } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import axios from "axios";
import {UserBlockList} from './UserBlock'
// import "./css/bootstrap_theme.css";
import "../css/search.css";

export function SearchBar(props) {
  const [search_string, setSearchstring] = useState("");
  const [user_ids, set_user_ids] = useState([]); 


  function search_user(search_string) {
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    let data = {username: search_string};
    //not currently implemented on backend going to fix
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/search_user",
        data,
        head
      )
      .then((result) => {
        if (result) {
          // console.log("finished searching user", result);
          if (result.status === 200) {
            console.log("t1", result.data.users);
            set_user_ids(result.data.users)
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
          className="searchbar"
          type="search"
          placeholder="Username.."
          onChange={(v) => setSearchstring(v.target.value)}
        ></input>
      </form>

      <Button
        variant="secondary"
        className="submit"
        onClick={() => search_user(search_string)}
      >
        {" "}
        search
      </Button>
      <div>
        {/* <UserBlockList user_ids = {user_ids}/> */}
        {user_ids}
      </div>
    </div>
  );
}
