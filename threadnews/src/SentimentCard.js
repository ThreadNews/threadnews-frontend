import React, {useState, useEffect } from "react";
import {Doughnut} from 'react-chartjs-2'
import "./css/sentimentCard.css";
import {
  Toast,
  Card,
  Col,
  Row,
  Container,
  Button,
  Badge,
} from "react-bootstrap";
export function SentimentCard(props){
    // let data = props.sentiment.values()
    let data = [{data:[0.1,0.1,0.4,0.3],}]
    // let pieLabels = ["Happy","Angry","Suprising"]

    return(
        <div className="sentiment-card">
            <Card></Card>
        </div>
    )
}