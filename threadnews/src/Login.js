import React, {useState,} from 'react';
import './css/Login.css'
import axios from 'axios';
import {LinkContainer} from 'react-router-bootstrap'

import Top_nav from './Nav'
export default function Login(props) {
    const [email, setEmail] = useState('');
    // const [is_login,setLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [login_count, setLoginCount, ] = useState(0);
    const is_login = true;
   

    function signUp(){
        console.log("starting sign up...")
        console.log("username:",username, "EMAIL:",email, " Password:",password)
        //this must be changed
        axios.post(`http://127.0.0.1:5000/newUser/${username}/${email}/${password}`).then( result => {
      if (result){
            console.log("finished adding user",result)
            localStorage.setItem('user', JSON.stringify(result.data))
            //props.onSignup()
      }
    })
    }

    function login(){
        // int login_count = 0;
        console.log("starting login...")
        axios.post(`http://127.0.0.1:5000/login`,JSON.stringify({'email':email,'password':password})).then( result => {
            if (result){
                
                if(result.data["status"]==="Failure"){
                   setLoginCount(login_count + 1)
                }
                else{
                    sessionStorage.setItem('user', JSON.stringify(result.data.user))
                    props.onLogin()
                }
            }
        })
    }


    return (
        <div className="outer">
            <Top_nav></Top_nav>
            <div className='inner'>
                <form>
                    <h3 fontfamily='TimesNewRoman'>{is_login?'Log in':'Register'}</h3>
                    {is_login?null:
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
                        
                        onClick={is_login? ()=>login():()=>signUp()}>{is_login?'Log in':'Sign Up'}</button>

                    {/* <button type="submit">test </button> */}
                        {/* className="btn btn-dark btn-lg btn-block"
                        // onClick={()=>setLogin(!is_login)}>{is_login?'Log in':'Sign Up'}</button> */}
                    </LinkContainer>
                </form>
            </div>
        </div>
    );
    
    }