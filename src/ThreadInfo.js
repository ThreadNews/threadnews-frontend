import React, {useState, useEffect } from "react";
import {Row,Col, Container} from 'react-bootstrap';
import {SentimentCard} from './SentimentCard.js'
import {CommentCol } from './CommentCol.js'
export function ThreadInfo(props){
    return(<Container className="ThreadInfo">

        <SentimentCard {...props}/>
        <CommentCol {...props}/>
    </Container>
        
    )
}