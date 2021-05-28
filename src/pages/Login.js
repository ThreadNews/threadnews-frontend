/**
 * handles both signin and login functionality
 * based off if user has valid accesstoken
 *
 * @summary login and signup page
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:23:45 
 * Last modified  : 2021-05-28 10:25:12
 */

//react imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";
//component imports
import { store_user } from "../functions/LocalStorageHelper";
//css imports
import "../css/Login.css";

require("dotenv").config();
console.log();

export default function Login(props) {
  const [email, setEmail] = useState("");

  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [login_count, setLoginCount] = useState(0);
  const is_login = props.is_login;

  function signOut() {
    sessionStorage.clear();
  }

  function signUp() {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/newUser", {
        username: username,
        email: email,
        password: password,
      })
      .then((result) => {
        if (result) {
          console.log("finished adding user", result);
          if (result.status === 200) {
            sessionStorage.setItem("access_token", result.data["access_token"]);
            store_user(result.data.user);

            history.push("/");
          } else {
            setErrMsg(result.data["msg"]);
          }
        }
      })
      .catch(function (error) {
        setLoginCount(login_count + 1);
        console.log("error,", error.response.data);
        setErrMsg(error);
      });
  }

  function login() {
    console.log("starting login...");
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log("status", result.status);
        if (result) {
          if (result.status === 404) {
            setErrMsg(result["error"]);
            console.log("Incorrect login");
          }
          if (result.status === 200) {
            console.log("REsult", result.data);
            sessionStorage.setItem("access_token", result.data["access_token"]);
            store_user(result.data.user);
            history.push("/threads/");
          }
        }
      })
      .catch(function (error) {
        setLoginCount(login_count + 1);
        setErrMsg(error);
      });
  }

  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3 className="loginText" fontFamily="TimesNewRoman" color="black">
            {is_login ? "Log in" : "Register"}
          </h3>
          {is_login ? null : (
            <div className="form-group">
              <label>Username</label>
              <input
                onChange={(v) => setUsername(v.target.value)}
                className="form-control"
                placeholder="Enter username"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(v) => setEmail(v.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(v) => setPassword(v.target.value)}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          {errMsg === "" ? null : <Alert variant="danger">{errMsg}</Alert>}
          <LinkContainer to="/threads/">
            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              href={is_login ? "/threads/" : "/"}
              onClick={is_login ? login : () => signUp()}
            >
              {is_login ? "Log in" : "Sign Up"}
            </button>
          </LinkContainer>
        </form>
      </div>
    </div>
  );
}
