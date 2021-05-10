import React from "react";
import {useState} from 'react'
import axios from "axios";
import { Container, Row, Col,Form,CardColumns,Badge,Button,div, FormGroup, } from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import "./css/ThreadPage.css";
import './css/edit_profile.css'
import {get_user} from './LocalStorageHelper'
import {LinkContainer} from 'react-router-bootstrap'



export function EditProfile(props) {

    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [profile_pic, setProfilepic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const history = useHistory();
    const [errMsg, setErrMsg] = useState('');

    function update_user_data(){
        let token = sessionStorage.getItem('access_token');
        let head = {headers:{Authorization:"Bearer "+ token}}
        let data = {bio:bio,first_name:first_name,last_name:last_name, profile_pic:profile_pic, password:password, email:email}
        axios.post('http://127.0.0.1:5000/edit_profile',data,head).then( result => {
        if (result){
            console.log("finished updating user",result)
            if (result.status === 200){
                console.log("first",first_name)
                sessionStorage.setItem('first_name', first_name)
                sessionStorage.setItem('last_name', last_name)
                sessionStorage.setItem('profile_pic', profile_pic)
                sessionStorage.setItem('password', password)
                sessionStorage.setItem('email', email)
                history.push('/profile')
            }
            else{
                setErrMsg(result.data['msg'])
            }
      }
    }).catch(function(error) {
        console.log("error,",error.response.data.msg)
        setErrMsg(error.response.data.msg)})}
  let user = get_user()
    

return (
    <div className="container profile profile-view" id="profile">
    <Form>
        <div className="form-row profile-row">
            <Col md={4}  /* style="background: var(--white);border-color: var(--white);" */>
                <div className="avatar">
                    <div className="avatar-bg center" s/* tyle="color: var(--blue);background: linear-gradient(var(--blue), white), linear-gradient(black, white), linear-gradient(black, white), var(--blue);" */></div>
                <div><input className="form-control-file form-control" type="file" name="avatar-file" /* style="border-color: var(--white);padding: 30px 12px;" *//></div>
                </div>
            </Col>
            <Col md={8}>
                <h1> Edit Profile </h1>
                <hr /* style="border-color: var(--white);" *//>
                    
                <Row>
                    <Col sm={12} md={6}>
                      <div class="form-group"><label>Firstname </label><input onChange = {v=>setFirstname(v.target.value)}  class="form-control" type="text" name="firstname"/></div>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup class="form-group"><label>Lastname </label><input onChange = {v=>setLastname(v.target.value)}  class="form-control" type="text" name="lastname"/></FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup><label>Username</label><input onChange = {v=>setUsername(v.target.value)} class="form-control" autocomplete="off" required="" name="username"/></FormGroup>
                    </Col>
                    <Col>
                        <FormGroup><label>Email</label><input onChange = {v=>setEmail(v.target.value)} class="form-control" type="email" autocomplete="off" required="" name="email"/></FormGroup>
                    </Col>
                </Row>
                <div class="form-row">
                    <Col sm={12} md={6}>
                        <FormGroup><label>Password </label><input  onChange = {v=>setPassword(v.target.value)} class="form-control" type="password" name="password" autocomplete="off" required=""/></FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup><label>Confirm Password</label><input  onChange={v=>setConfirmPassword(v.target.value)} type="password" class="form-control" name="confirmpass" autocomplete="off" required=""/></FormGroup>
                    </Col>
                </div>
                {/* <h3>Interests</h3> */}
                <hr/>
                <div class="form-row">
                    <div class="col-md-12 content-right"><button onClick={update_user_data} class="btn btn-primary form-btn" type="submit">Update </button><button class="btn btn-danger form-btn" type="reset">Cancel </button></div>
                </div>

            </Col>
            <Col md={8} /* style="border-color: var(--white);" */>
                <hr /* style="border-color: var(--white);" *//>
            </Col>
        </div>
    </Form>
    </div>
  )
}


