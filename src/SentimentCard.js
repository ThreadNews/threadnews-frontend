import React, {useState, useEffect } from "react";
import {Doughnut} from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import "../css/sentimentCard.css";
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
    let article = props
    // let data = props.sentiment.values()
    let pieLabels = typeof props.sentiment ==="undefined" ?[]:Object.keys(props.sentiment)
    let sentData=[]
    if(props.sentiment!=null){
    sentData = [{data:
        Object.values(props.sentiment)}]
        sentData[0]['backgroundColor'] =typeof props.sentiment =="undefined" ?[]:
        ['rgba(247, 130, 33, 0.4)',
        'rgba(223, 84, 66, 0.4)',
        'rgba(94, 189, 62, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        ]
    }
    
    
    let opts = defaults.doughnut
    opts.legend.display=false
    return(
        <div className="sentiment-card">
           
            <Doughnut
            data={{labels:pieLabels,datasets:sentData}}
            options={defaults.doughnut}
            width={70}
            height={70}
            />
            
        </div>
    )
}