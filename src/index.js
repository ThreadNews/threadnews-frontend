import React from "react";
import ReactDOM from "react-dom";
import InterestPage from "./InterestPage";
import { ThreadPage } from "./ThreadPage";
import Login from "./Login";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNav from "./Nav";
import {EditProfile} from './EditProfile'
function view_threads() {
  ReactDOM.render(
    <React.StrictMode>
      <ThreadPage />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

function signup() {
  console.log("was called");
  ReactDOM.render(
    <React.StrictMode>
      {/* // go to bubbles  */}
      <InterestPage onFinish={view_threads} />
      {/* // path defined below  */}
    </React.StrictMode>,
    document.getElementById("root")
  );
}


let user = sessionStorage.getItem("user")? sessionStorage.getItem("user") : null;
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TopNav />
      <Switch>
        <Route exact path="/">
          <InterestPage/>
        </Route>
        <Route path="/threads/" component={ThreadPage} />
        <Route path="/login/">
          <Login onSignup={signup} is_login={true} />
        </Route>
        <Route path="/signup/">
          <Login onSignup={signup} is_login={false} />
        </Route>
        <Route path="/profile/">
          <Profile {...user} />
        </Route>
        <Route path="/editprofile/">
          <EditProfile/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
