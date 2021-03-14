import React, {useState,} from 'react';
import './css/Login.css'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'

import Top_nav from './Nav'
export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    function signUp(){
        console.log("starting sign up...")
        console.log("EMAIL:",email, " Password:",password)
        //this must be changed
        // axios.post(`http://127.0.0.1:5000/newUser/${username}/${email}/${password}`).then( result => {
        axios.post('http://127.0.0.1:5000/newUser', {username:username,email:email,password:password}).then( result => {
      if (result){
            console.log("finished adding user",result)
            localStorage.setItem('user',result.data)
            //props.onSignup()
      }
    })
    }

    function login(){
        console.log("starting login...")
    }

    return (
        <div className="outer">
            <div className='inner'>
                <form>
                    <h3 fontfamily='TimesNewRoman'>{props.login?'Log in':'Register'}</h3>
                    {props.login?null:
                        (<div className="form-group">
                            <label >Username</label>
                            <input onChange = {v=>setUsername(v.target.value)}type="email" className="form-control" placeholder="Enter email" />
                        </div>)
                    }

                    <div className="form-group">
                        <label >Email</label>
                        <input onChange = {v=>setEmail(v.target.value)}type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange = {v=>setPassword(v.target.value)} className="form-control" placeholder="Enter password" />
                    </div>
                    
                    <LinkContainer to='/threads'>
                    <button type="submit" 
                        className="btn btn-dark btn-lg btn-block"
                        
                        onClick={props.login? login():()=>signUp()}>{props.login?'Log in':'Sign Up'}</button>
                    </LinkContainer>
                </form>
            </div>
        </div>
    );
    
}