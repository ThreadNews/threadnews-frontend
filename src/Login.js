import React, {useState, useCallback} from 'react';
import './css/Login.css'
import axios from 'axios';
import {Alert} from 'react-bootstrap'
import {LinkContainer,} from 'react-router-bootstrap'
import {useHistory} from 'react-router-dom';
// import sha256 from 'js-sha256'
// {"_id":{"$oid":"6035d5ebc37963b87231326b"},
//     "user_id":"bddb3246-7658-11eb-95ba-acde48001122",
//     "username":"userN",
//     "first_name":"John",
//     "last_name":"Doe",
//     "email":"jk@g.com",
//     "interests":[],
//     "pass_hash":"1473a11dc0f3745bf1769c1251da96b002b1b1af6fff7da812f4daf41425ee473ec630a3af87eef90c5e6c4dc53730c16b06ce369202ba01843962cb7b17b727"}






import Top_nav from './Nav'
export default function Login(props) {
    const [email, setEmail] = useState('');
    const history = useHistory();
    // const [is_login,setLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [login_count, setLoginCount, ] = useState(0);
    const is_login = false;
   

    function signUp(){
        // console.log("starting sign up...")
        // console.log("username:",username, "EMAIL:",email, " Password:",password)
        //this must be changed
       axios.post('http://127.0.0.1:5000/newUser', {username:username,email:email,password:password}).then( result => {
      if (result){
            console.log("finished adding user",result)
            if (result.status == 200){
               localStorage.setItem('access_token',result.data['access_token'])
                localStorage.setItem('user_name', username)
                history.push('/')
            }
            else{
                setErrMsg(result.data['msg'])
            }
      }
    }).catch(function(error) {
        setLoginCount(login_count + 1)
        // history.push("/login")
        console.log("error,",error.response.data.msg)
        setErrMsg(error.response.data.msg)
    })
    }
    const redirect_thread = useCallback(()=> history.push('/threads'),[history])

    function login(){
        // int login_count = 0;
        console.log("starting login...")
        axios.post(`http://127.0.0.1:5000/login`,{email:email,password:password},).then( result => {
            console.log("status",result.status)
            if (result){
                
                if(result.status==404){
                   
                   setErrMsg(result['error'])
                   console.log("Incorrect login")
                }
                if(result.status==200){
                    console.log(result)
                    localStorage.setItem('access_token',result.data['access_token'])
                    // history.push('/threads/')
                    redirect_thread()
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

                    <h3 className="loginText" fontfamily='TimesNewRoman' color="black" >{is_login?'Log in':'Register'}</h3>
                    {is_login?null:
                        (<div className="form-group">
                            <label >Username</label>
                            <input onChange = {v=>setUsername(v.target.value)}type="email" className="form-control" placeholder="Enter email" />
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
                    
                    {/* <LinkContainer to='/threads'> */}
                    <button type="submit" 
                        className="btn btn-dark btn-lg btn-block"
                        // href={is_login?'/threads/':'/'}
                        onClick={is_login? ()=>login():()=>signUp()}>
                            {is_login?'Log in':'Sign Up'}
                    </button>
                    
                    {/* </LinkContainer> */}
                </form>
            </div>
        </div>
    );
    
    }