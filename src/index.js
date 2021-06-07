import React from "react";
import ReactDOM from "react-dom";
import InterestPage from "./pages/InterestPage";
import { ThreadPage } from "./pages/ThreadPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNav from "./components/Nav";
import { EditProfile } from "./pages/EditProfile";
import { SearchResults } from "./pages/searchResults.js";
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

let user = sessionStorage.getItem("user")
  ? sessionStorage.getItem("user")
  : null;
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TopNav />
      <Switch>
        <Route exact path="/">
          <InterestPage />
        </Route>
        <Route path="/threads/" component={ThreadPage} />
        <Route path="/login/">
          <Login onSignup={signup} is_login={true} />
        </Route>
        <Route path="/signup/">
          <Login onSignup={signup} is_login={false} />
        </Route>
        <Route path="/profile/">
          <Profile  />
        </Route>
        <Route path="/editprofile/">
          <EditProfile />
        </Route>
        <Route path="/searchresults">
          <SearchResults />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
