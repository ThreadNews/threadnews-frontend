/**
 * functions that interact with that interact with backend
 * follow user, search users, repost, like, save
 *
 * @summary social functions
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:37:40
 * Last modified  : 2021-06-08 22:37:34
 */

import axios from "axios";

//need to import react to avoid cors error
import react from "react";

//used to import env variables for frontend and backend urls
require("dotenv").config();

export function update_user_interests(interests) {
  axios.post(process.env.REACT_APP_BACKEND_URL + "/update_interests", {
    user_id: "test user id",
    add: interests,
  });
  console.log("updated user interests");
}

export async function follow(user_id) {
  let token = sessionStorage.getItem("access_token");
  let data = { user_id: user_id, action: "follow" };
  let head = { headers: { Authorization: "Bearer " + token } };
  console.log("User follow attempt");
  axios.post(process.env.PUBLIC_URL + "/follow_user", data, head);
}

export function search_users(search_string) {
  let token = sessionStorage.getItem("access_token");
  let head = { headers: { Authorization: "Bearer " + token } };
  let data = { user_name: search_string };

  return axios.post(
    process.env.REACT_APP_BACKEND_URL + "/search_user",
    data,
    head
  );
  // .then((result) => {
  //   if (result) {
  //     console.log("finished searching user", result);
  //     if (result.status === 200) {
  //       let user_ids = result.data.users;
  //       console.log("USER ids", user_ids);
  //       return user_ids;
  //     } else {
  //       console.log("ERROR");
  //       return null;
  //     }
  //   }

  // else{
  //   console.log("error");
  //   console.log("search string", search_string);
  // }
}

export function get_users(user_ids) {
  // let res = null;
  let token = sessionStorage.getItem("access_token");
  let data = { user_ids: user_ids, action: "follow" };
  let head = { headers: { Authorization: "Bearer " + token } };
  const res = axios.post(
    process.env.REACT_APP_BACKEND_URL + "/users",
    data,
    head
  );
  // .then((result) => {
  //   if (result) {
  //     res = result.data.result;
  //     console.log("result here:", result.data.result);
  //     return result["result"];
  //   }
  // });
  // console.log("recommended: ", res.data.result);
  // return res.data.result;
  return res;
}

export async function repost(id, type = "article") {
  let token = sessionStorage.getItem("access_token");
  let data = { action: "add", id: id };
  let head = { headers: { Authorization: "Bearer " + token } };
  console.log("data:", data);
  axios.post(process.env.REACT_APP_BACKEND_URL + "/repost", data, head);
}

export function like(id, type = "article") {
  let token = sessionStorage.getItem("access_token");
  let data = { action: "add", id: id, type: type };
  console.log("data:", data);
  let head = { headers: { Authorization: "Bearer " + token } };
  axios.post(process.env.REACT_APP_BACKEND_URL + "/like", data, head);
}

export function save(id, saved, type = "article", action = "add") {
  let data = { action: "add", id: id, type: type };
  let token = sessionStorage.getItem("access_token");
  let head = { headers: { Authorization: "Bearer " + token } };
  if (saved) {
    data.action = "delete";
  }
  axios.post(process.env.REACT_APP_BACKEND_URL + "/save", data, head);
}
