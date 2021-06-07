/**
 * creates nav bar which shows signed in user
 * if not signed in has buttons for user to login or create account
 * implements SearchBar component
 * 
 * @summary navigation component at top of each page
 * @author Thread News
 *
 * Last modified  : 2021-05-28 22:45:37
 * Last modified  : 2021-05-28 22:44:19
 */

import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/bootstrap_theme.css";

import "../css/Nav.css";
import { LinkContainer } from "react-router-bootstrap";
import { SearchBar } from "./SearchBar";
export default function Top_nav(props) {
  function logout() {
    sessionStorage.clear();
  }
  let logo = process.env.PUBLIC_URL + "/assets/ThreadNews.png";

  let nav_items = (
    <Nav className="ml-auto" bg="primary" variant="light">
      <Nav.Link style={{ color: "white" }} href="/threads/">
        Threads
      </Nav.Link>
      {sessionStorage.getItem("access_token") ? (
        <LinkContainer to="/profile">
          <Nav.Link style={{ color: "white" }}>
            {sessionStorage.getItem("first_name")}{" "}
            {sessionStorage.getItem("last_name")}
          </Nav.Link>
        </LinkContainer>
      ) : null}

      <LinkContainer to="/login" onClick={logout}>
        <Nav.Link style={{ color: "white" }}>
          {sessionStorage.getItem("access_token") ? "Log out" : "Login"}
        </Nav.Link>
      </LinkContainer>

      {!sessionStorage.getItem("access_token") ? (
        <LinkContainer to="/signup" onClick={logout}>
          <Nav.Link style={{ color: "white" }}>signup</Nav.Link>
        </LinkContainer>
      ) : null}
    </Nav>
  );

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Navbar fixed="top" bg="info">
        <Container className="logo-container">
          <Navbar.Brand>
            <img className="logo" src={logo} alt="" />
          </Navbar.Brand>
        </Container>
        <SearchBar />
        {nav_items}
      </Navbar>
    </div>
  );
}
