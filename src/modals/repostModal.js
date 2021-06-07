/**
 * displayed after user clicks repost button and prompts user for confirmation
 *
 * @summary repost confirmation modal
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:21:27 
 * Last modified  : 2021-05-28 22:21:47
 */

//react imports
import React from "react";
import { Button, Modal } from "react-bootstrap";

import { repost } from "../functions/Social.js";
//css imports
import "../css/modal.css";
export function RepostModal(props) {
  return (
    <Modal
      align="center"
      show={true}
      onHide={() => props.setRepostArticle(false)}
      classname="modal"
    >
      <Modal.Title>Would you like to repost this article? </Modal.Title>
      <Modal.Body>
        <Button
          className="modalButton"
          onClick={() => {
            repost(props.article_id);
            props.setRepostArticle(false);
          }}
        >
          Yes
        </Button>
        <h4>Or</h4>
        <Button
          className="modalButton"
          variant="warning"
          onClick={() => props.setRepostArticle(false)}
        >
          Exit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default RepostModal;
