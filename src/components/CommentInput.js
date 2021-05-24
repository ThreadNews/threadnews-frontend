import React from "react";
import { Button, Form } from "react-bootstrap";

export function CommentInput(props) {
  return (
    <div className="postComment">
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={7}
            onChange={(v) => props.handleChange(v)}
            placeholder="Tell us your thoughts"
            value={props.comment}
          />
        </Form.Group>
      </Form>
      <Button onClick={props.post_comment}>Post</Button>
    </div>
  );
}
