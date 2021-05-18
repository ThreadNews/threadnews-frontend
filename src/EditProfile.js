import React from "react";
import { useState } from "react";
import axios from "axios";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./css/ThreadPage.css";
import "./css/edit_profile.css";
import { get_user, store_user } from "./LocalStorageHelper";

export function EditProfile(props) {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [profile_pic, setProfilepic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");

  function update_user_data() {
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
            store_user(result.result, false);
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
          <Col md={4}>
            <div className="avatar">
              <div className="avatar-bg center"></div>
              <div>
                <input
                  className="form-control-file form-control"
                  type="file"
                  name="avatar-file"
                />
              </div>
            </div>
          </Col>
          <Col md={8}>
            <h1> Edit Profile </h1>
            <hr />

            <Row>
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
                    autocomplete="off"
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
                    autocomplete="off"
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
                    autocomplete="off"
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
                    autocomplete="off"
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
