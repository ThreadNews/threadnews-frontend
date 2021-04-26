import React from "react";

import axios from "axios";
import { Container, Row, Col,Form,CardColumns,Badge,Button,div, FormGroup } from "react-bootstrap";

import "./css/ThreadPage.css";
export function EditProfile(props) {

  return (
    <div class="container profile profile-view" id="profile">
    <Form>
        <div class="form-row profile-row">
            <Col md={4}  /* style="background: var(--white);border-color: var(--white);" */>
                <div class="avatar">
                    <div class="avatar-bg center" s/* tyle="color: var(--blue);background: linear-gradient(var(--blue), white), linear-gradient(black, white), linear-gradient(black, white), var(--blue);" */></div>
                <div><input class="form-control-file form-control" type="file" name="avatar-file" /* style="border-color: var(--white);padding: 30px 12px;" *//></div>
                </div>
            </Col>
            <Col md={8}>
                <h1>Profile </h1>
                <hr /* style="border-color: var(--white);" *//>
                    
                <div class="form-row">
                    <Col sm={12} md={6}>
                        <div class="form-group"><label>Firstname </label><input class="form-control" type="text" name="firstname"/></div>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup class="form-group"><label>Lastname </label><input class="form-control" type="text" name="lastname"/></FormGroup>
                    </Col>
                </div>
                <FormGroup><label>Email</label><input class="form-control" type="email" autocomplete="off" required="" name="email"/></FormGroup>
                <div class="form-row">
                    <Col sm={12} md={6}>
                        <FormGroup><label>Password </label><input class="form-control" type="password" name="password" autocomplete="off" required=""/></FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup><label>Confirm Password</label><input class="form-control" type="password" name="confirmpass" autocomplete="off" required=""/></FormGroup>
                    </Col>
                </div>
                <h3>Interests</h3>
                <hr/>
                <div class="form-row">
                    <div class="col-md-12 content-right"><button class="btn btn-primary form-btn" type="submit">Update </button><button class="btn btn-danger form-btn" type="reset">Cancle </button></div>
                </div>

            </Col>
            <Col md={8} /* style="border-color: var(--white);" */>
                <hr /* style="border-color: var(--white);" *//>
            </Col>
        </div>
    </Form>
    </div>
  );
}


