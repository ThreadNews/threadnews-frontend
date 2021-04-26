import React, {useState, useCallback} from 'react';
import './css/Login.css'
import axios from 'axios';
import {Alert} from 'react-bootstrap'
import {LinkContainer,} from 'react-router-bootstrap'
import {useHistory} from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [login_count, setLoginCount, ] = useState(0);
    const is_login = props.is_login;

    function signOut(){
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user_name');
    }


    function signUp(){
    axios.post('http://127.0.0.1:5000/newUser', {username:username,email:email,password:password}).then( result => {
      if (result){
            console.log("finished adding user",result)
            if (result.status == 200){
               sessionStorage.setItem('access_token',result.data['access_token'])
                sessionStorage.setItem('user_name', username)
                
                
                history.push('/')
            }
            else{
                setErrMsg(result.data['msg'])
            }
      }
    }).catch(function(error) {
        setLoginCount(login_count + 1)
        
        console.log("error,",error.response.data.msg)
        setErrMsg(error.response.data.msg)
    })
    }


    
    const redirect_thread = useCallback(()=> history.push('/threads'),[history])

    function login(){
        console.log("starting login...")
        axios.post('http://127.0.0.1:5000/login',{email:email,password:password},).then( result => {
            console.log("status",result.status)
            if (result){
                if(result.status==404){
                   setErrMsg(result['error'])
                   console.log("Incorrect login")
                }
                if(result.status==200){
                    console.log("result",result)
                    sessionStorage.setItem('access_token',result.data['access_token'])
                    sessionStorage.setItem('email', email)
                    history.push('/threads/')
                    //redirect_thread()
                }
            }
        }).catch(function(error) {
            setLoginCount(login_count + 1)
            // history.push("/login")
            // console.log("error,",error.response.data.msg)
            setErrMsg(error.response.data.msg)
        })
    }


    return (
        <div className="outer">
            <div className='inner'>
                <form>
                    <h3 className="loginText" fontFamily='TimesNewRoman' color="black" >{is_login?'Log in':'Register'}</h3>
                    {is_login?null:
                        (<div className="form-group">
                            <label >Username</label>
                            <input onChange = {v=>setUsername(v.target.value)} className="form-control" placeholder="Enter username" />
                        </div>)
                    }
                    <div className="form-group">
                        <label>Email</label>
                        <input onChange = {v=>setEmail(v.target.value)}type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange = {v=>setPassword(v.target.value)} className="form-control" placeholder="Enter password" />
                    </div>
                    {errMsg==''?null:<Alert variant="danger">{errMsg}</Alert>}                    
                    <LinkContainer to='/threads'>
                    <button type="submit" 
                        className="btn btn-dark btn-lg btn-block"
                        // href={is_login?'/threads/':'/'}
                        onClick={is_login?login:()=>signUp()}>
                            {is_login?'Log in':'Sign Up'}
                    </button>
                    
                    </LinkContainer>
                </form>
            </div>
        </div>
    );
    
    }