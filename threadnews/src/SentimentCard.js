import React, {useState, useEffect } from "react";
import {Doughnut} from 'react-chartjs-2'
import {Card} from 'react-bootstrap';
import "./css/sentimentCard.css";
export function SentimentCard(props){
    // let data = props.sentiment.values()
    let data = [{data:[0.1,0.1,0.4,0.3],}]
    // let pieLabels = ["Happy","Angry","Suprising"]

    return(
        <div className="sentiment-card">
        <Card>
            {/* <Doughnut
            data={{labels:pieLabels,datasets:sentData}}> */}
        </Card>
        </div>
    )
}