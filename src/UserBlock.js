import React, {useState } from "react";
// import { useState, useEffect, useRef } from "react";
import { Container, Card, } from "react-bootstrap";
import './css/UserBlock.css';
import {follow} from './Social.js'
import {get_user} from './LocalStorageHelper'
export function UserBlock(user){
    // let user = get_user()
    console.log(user);
    return(
    <div>
        <Container className="mt-5 d-flex justify-content-center card">
            <Card>
                <div className="d-flex align-items-center">
                    <div ><img className="UserImg" src={user.profile_img} alt=""  width="150"/></div>
                    
                    <div className="ml-3 w-100">
                        <h4 className="mb-0 mt-0">{user.first_name} {user.last_name}</h4>
                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div className="d-flex flex-column"> <span className="followers"># Reposted </span> <span>{user.repost_count}</span> </div>
                            <div className="d-flex flex-column"> <span className="followers">Followers</span> <span>{user.follower_count}</span> </div>
                            <div className="d-flex flex-column"> <span className="followers">Following</span> <span>{user.following_count}</span> </div>
                        </div>
                        <div className="button mt-2 d-flex flex-row align-items-center">
                            <button className="btn btn-sm btn-outline-primary w-100">View Profile</button> 
                            <button className="btn btn-sm btn-primary w-100 ml-2" onClick={follow}>Follow</button> 
                        </div>
                    </div>
                </div>
            </Card>
        </Container>
        
        </div>)
        
}

export function UserBlockList(user_ids){
    const [users, setUsers] = useState([]);

    // useEffect(()=> {
    //     let token = sessionStorage.getItem('access_token');
    //     // let data = {user_id:user_id,action:'follow'};
    //     let head = {headers:{Authorization:"Bearer "+ token}}
    //     let data = {user_ids:user_ids}
    //     //****
    //     axios.post('http://127.0.0.1:5000/users',data,head).then( result => {
    //     if (result){
    //         console.log("getting users",result)
    //         if (result.status === 200){
    //             setUsers(result.data.result)
    //         }
    //         else{
    //             console.log("user block error")
    //         }
    //     }
    // }).catch(function(error) {
    //     console.log("error, in userBlock")
    
    // })
    // }, [] )

    
    let blocks = users.map((user, i) => {
        return (
          <div>
            <UserBlock {...user}></UserBlock>
          </div>
        );
      });

      return (
          <div>
              <h3>{user_ids.header}</h3>
              {blocks}
          </div>
      )


}


