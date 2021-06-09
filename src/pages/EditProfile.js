/**
 * page that user can change name,email,password
 * user can also add a link to an image as a profile image
 *
 * @summary page that allows users to edit profile values
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:16:00 
 * Last modified  : 2021-06-08 21:46:12
 */

import React from "react";
import { useState } from "react";
import axios from "axios";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../css/ThreadPage.css";
import "../css/edit_profile.css";
import { get_user, store_user } from "../functions/LocalStorageHelper";
require("dotenv").config();


export function EditProfile(props) {
  let user = get_user();

  const [first_name, setFirstname] = useState(user.first_name);
  const [last_name, setLastname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(user.user_name);
  const [bio, setBio] = useState(user.bio);
  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");
  const [profile_pic, setProfileImage] = useState("");

  function update_user_data() {
    let user = { ...get_user(), first_name: first_name, user_name: username };

    console.log("starting update_user_data");
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };

    let data = {
      bio: bio,
      first_name: first_name,
      last_name: last_name,
      profile_pic: profile_pic,
      password: password,
      email: email,
    };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/edit_profile", data, head)
      .then((result) => {
        if (result) {
          console.log("finished updating user", result);
          if (result.status === 200) {
            store_user(user, false);
            history.push("/profile");
          } else {
            setErrMsg(result.data["msg"]);
          }
        }
      })
      .catch(function (error) {
        console.log("error,", error.response.data.msg);
        setErrMsg(error.response.data.msg);
      });
  }

  return (
    <div className="container profile profile-view" id="profile">
      <Form>
        <div className="form-row profile-row">
          <Col md={8}>
            <h1> Edit Profile </h1>
            <hr />
            <Row>
              <Col sm={12} md={6}>
                <div class="form-group">
                  <label> Bio </label>
                  <input
                    onChange={(v) => setBio(v.target.value)}
                    class="form-control"
                    type="text"
                    name="firstname"
                  />
                </div>
              </Col>

              <Col sm={12} md={6}>
                <div class="form-group">
                  <label>Image URL </label>
                  <input
                    onChange={(v) => setProfileImage(v.target.value)}
                    class="form-control"
                    type="text"
                    name="firstname"
                  />
                </div>
              </Col>

              <Col sm={12} md={6}>
                <div class="form-group">
                  <label>Firstname </label>
                  <input
                    onChange={(v) => setFirstname(v.target.value)}
                    class="form-control"
                    type="text"
                    name="firstname"
                  />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup class="form-group">
                  <label>Lastname </label>
                  <input
                    onChange={(v) => setLastname(v.target.value)}
                    class="form-control"
                    type="text"
                    name="lastname"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label>Username</label>
                  <input
                    onChange={(v) => setUsername(v.target.value)}
                    class="form-control"
                    required=""
                    name="username"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>Email</label>
                  <input
                    onChange={(v) => setEmail(v.target.value)}
                    class="form-control"
                    type="email"
                    required=""
                    name="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <div class="form-row">
              <Col sm={12} md={6}>
                <FormGroup>
                  <label>Password </label>
                  <input
                    onChange={(v) => setPassword(v.target.value)}
                    class="form-control"
                    type="password"
                    name="password"
                    required=""
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label>Confirm Password</label>
                  <input
                    onChange={(v) => setConfirmPassword(v.target.value)}
                    type="password"
                    class="form-control"
                    name="confirmpass"
                    required=""
                  />
                </FormGroup>
              </Col>
            </div>

            <hr />
            <div class="form-row">
              <div class="col-md-12 content-right">
                <button
                  onClick={update_user_data}
                  class="btn btn-primary form-btn"
                  type="submit"
                >
                  Update{" "}
                </button>
                <button class="btn btn-danger form-btn" type="reset">
                  Cancel{" "}
                </button>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <hr />
          </Col>
        </div>
      </Form>
    </div>
  );
}
