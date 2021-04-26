import React, { useEffect } from "react";
import axios from "axios";
// import { useState, useEffect, useRef } from "react";
import { Container, Row, Col,ListGroup,Button } from "react-bootstrap";
import './css/SocialCol.css';
import {follow} from './Social.js'

export function UserBlock(props){
    let user ={
        user_id: "complex",
        username: "elon-the-musker",
        first_name: "Elon",
        last_name: "Musk",
        email: 'elongate@gmail.com',
        interests: ['cars','crypto','space','e-girls'],
        profile_img: "data:image/jpeg;base64,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",
        bio: "i like trains no wait cars, yes i like cars",
        follower_count:10,
        following_count:20,
        repost_count:10,
        reposted_articles:['54bc318b-71f1-4d68-81d6-d75d6dc7b34e','811f6a6e-244d-4f02-837e-ec80fd94f95d','0455a9fe-6864-48d4-9f60-2613c8780c62']
    }



    return(
    <div>
        <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-3">
                <div className="d-flex align-items-center">
                    <div className="image"> <img src={user.profile_img} alt="" className="rounded" width="150"/></div>
                    <div class="ml-3 w-100">
                        <h4 class="mb-0 mt-0">{user.first_name} {user.last_name}</h4>
                        <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div class="d-flex flex-column"> <span class="articles"># Reposted </span> <span class="number1">{user.repost_count}</span> </div>
                            <div class="d-flex flex-column"> <span class="followers">Followers</span> <span class="number2">{user.follower_count}</span> </div>
                            <div class="d-flex flex-column"> <span class="rating">Following</span> <span class="number3">{user.following_count}</span> </div>
                        </div>
                        <div class="button mt-2 d-flex flex-row align-items-center">
                            <button class="btn btn-sm btn-outline-primary w-100">View Profile</button> 
                            <button class="btn btn-sm btn-primary w-100 ml-2" onClick={follow}>Follow</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </div>)
}