import React, { useState, useEffect } from "react";
import { search_users } from "../functions/Social";
import { UserBlock } from "../components/UserBlock";

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
    
      {searchResults}
  </div>);
}
