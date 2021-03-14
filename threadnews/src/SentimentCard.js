import React, {useState, useEffect } from "react";
import {Doughnut} from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import {Card} from 'react-bootstrap';
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
    // opts.legend.display=false
    console.log("sentdata",sentData)
    return(
        <div style={{paddingTop:'20px'}}>
            <h4 align='center' pad='10px'>Article Sentiment</h4>
            <Doughnut
            data={{labels:pieLabels,datasets:sentData}}
            options={defaults.doughnut}
            // width={250}
            // height={250}
            />
            
        </div>
    )
}