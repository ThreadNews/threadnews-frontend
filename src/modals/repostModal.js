//react imports
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { repost_article } from "../functions/Social.js";
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
            repost_article(props.article_id);
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