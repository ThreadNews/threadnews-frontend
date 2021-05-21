import React from "react";
import {Button , Modal } from "react-bootstrap";

export function LoginModal(props){
    return (
        <Modal>
            <Modal.Title>Opps... Looks like you aren't signed in</Modal.Title>
            <Modal.Body>
                <Button>Sign up</Button>
                <hr/>
                <Button> Create Account </Button>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;