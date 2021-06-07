/**
 * presents a modal pop-up that prompts user to login
 * presented if user is not logged in and tries to comment or like
 *
 * @summary Login prompt modal
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:41:36 
 * Last modified  : 2021-05-28 10:42:09
 */

//react imports
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//css imports
import "../css/modal.css";

export function LoginModal(props) {
  return (
    <Modal
      align="center"
      show={true}
      onHide={() => props.setPrompt(false)}
      className="modal"
      closebutton
    >
      <Modal.Title>Opps... Looks like you aren't signed in</Modal.Title>
      <Modal.Body>
        <LinkContainer to={"/signup"}>
          <Button className="modalButton">Sign up</Button>
        </LinkContainer>
        <h4>Or</h4>
        <LinkContainer to={"/login"}>
          <Button className="modalButton" variant="warning">
            {" "}
            Log in{" "}
          </Button>
        </LinkContainer>
        <Button
          className="modalButton"
          onClick={() => props.setPrompt(false)}
          varient="info"
        >
          close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
