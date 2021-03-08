import React, {useState, useEffect } from "react";
import {Card,Toast,Row,Col} from 'react-bootstrap';
import {SentimentCard} from './SentimentCard.js'
import {CommentCol } from './CommentCol.js'
export function ThreadInfo(props){
    return(<div className="ThreadInfo">
        {/* <Row> */}
            <SentimentCard {...props}/>
            {/* <Comment */}
        {/* </Row> */} 
        <CommentCol/>
    </div>
        
    )
}