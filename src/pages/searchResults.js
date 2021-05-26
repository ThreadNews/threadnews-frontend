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

  //   function search_user(search_string) {
  //     let token = sessionStorage.getItem("access_token");
  //     let head = { headers: { Authorization: "Bearer " + token } };
  //     let data = { username: search_string };
  //     //not currently implemented on backend going to fix
  //     axios
  //       .post(process.env.REACT_APP_BACKEND_URL + "/search_user", data, head)
  //       .then((result) => {
  //         if (result) {
  //           // console.log("finished searching user", result);
  //           if (result.status === 200) {
  //             console.log("t1", result.data.users);
  //             set_user_ids(result.data.users);
  //             console.log("USER ids", user_ids);
  //           } else {
  //             console.log("ERROR");
  //           }
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log("error");
  //         console.log("search string", search_string);
  //       });
  //   }

  return <div>{searchResults}</div>;
}
