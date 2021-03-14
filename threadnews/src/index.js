import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/bootstrap_theme.css';
import App from './App';
import {ThreadPage} from './ThreadPage'
import Login from './Login'
import Profile from './Profile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Top_nav from "./Nav";



function view_threads(){
  ReactDOM.render(
    <React.StrictMode>
    <ThreadPage/>
  </React.StrictMode>,
  document.getElementById('root')
  )
}

function login(){
  view_threads()
}

function signup(){  
  console.log("was called")
  ReactDOM.render(
    <React.StrictMode>
      <App onFinish={view_threads}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//   {/* <ThreadPage/> */}
//   <Login onLogin={login} onSignup={signup}/>
// </React.StrictMode>,
// document.getElementById('root')
// )

let login1 = (<Login onLogin={login} onSignup={signup}/>)

let user = {"user_id":"5ecc439c-6ed0-11eb-a6f4-acde48001122",
"username":"doge2moon",
"first_name":"Elon",
"last_name":"Musk",
"email":"testuser@gmail.com",
  "interests":["Economics","Sports","Pop Culture","Beauty","Fitness","Architcture"],
  'profile_img':'./assets/daddy.png',
  'bio': 'Everybody around here has slides in their lobbies. I’m actually wondering about putting in a roller coaster — like a functional roller coaster at the factory in Fremont. You’d get in, and it would take you around [the] factory but also up and down. Who else has a roller coaster? … It would probably be really expensive, but I like the idea of i'
}

 localStorage.setItem('user',user)

console.log("was called")
ReactDOM.render(
  <React.StrictMode>
    
    <Router>
    <Top_nav/>

      <Switch>
        <Route exact path="/"><App onFinish={login}/></Route>
        <Route path = '/threads' component={ThreadPage}/>
        <Route path = '/login'><Login onLogin={login} onSignup={signup}/></Route>
        <Route path ='/profile'><Profile {...user}/></Route>
      </Switch>
    </Router>
</React.StrictMode>,
document.getElementById('root')
)

