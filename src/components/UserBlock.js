import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Card } from "react-bootstrap";
import "../css/UserBlock.css";
import { follow, get_users } from "../functions/Social.js";

export function UserBlock(user) {
  console.log(user);
  return (
    <div>
      <Container className="mt-5 d-flex justify-content-center card">
        <Card>
          <div className="d-flex align-items-center">
            <div>
              <img
                className="UserImg"
                src={user.profile_img}
                alt=""
                width="150"
              />
            </div>

            <div className="ml-3 w-100">
              <h4 className="mb-0 mt-0">{user.user_name}</h4>
              <div className="p-2 mt-2 bg-primary d-flex justify-content-between stats">
                
                <div className="d-flex flex-column">
                  {" "}
                  <span className="followers">Followers</span>{" "}
                  <span>{user.follower_count}</span>{" "}
                </div>
                <div className="d-flex flex-column">
                  {" "}
                  <span className="followers">Following</span>{" "}
                  <span>{user.following_count}</span>{" "}
                </div>
              </div>
              <div className="button mt-2 d-flex flex-row align-items-center">
                <button className="btn btn-sm btn-outline-primary w-100">
                  View
                </button>
                <button
                  className="btn btn-sm btn-primary w-100 ml-2"
                  onClick={follow}
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export function UserBlockList(props) {
  const [users, setUsers] = useState([]);
  console.log("USER?Blok,", users);
  useEffect(() => {
    let users_obj = get_users(props.user_ids).then((result) => {
      if (result) {
        setUsers(result.data.result);
      }
    });
  }, []);

  const blocks = users.map((user, i) => {
    return (
      <div>
        <UserBlock {...user}></UserBlock>
      </div>
    );
  });

  return (
    <div>
      <p classwName="header">{props.header}</p>
      {blocks}
    </div>
  );
}
