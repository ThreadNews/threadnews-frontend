import React from 'react';
import './css/likes.css'
import { Row } from 'react-bootstrap';
import  axios from 'axios';





export function Likes(props){

    // function emot(emotion){
    //     let path = './assets/emotion_icons/';
       
        
    //     console.log("Emotions all sorted:",sorted_emotion)
    //     <img className='emotion' 
    //         style={{opacity:(!sentiment==='undefined' && !props.sentiment.Happy==='undefined')? props.sentiment.Happy+0.9:0}}src={'./assets/emotion_icons/Happy.svg'} />
    
    // }
    


    function emotions(emots){
        let emot_ls = []
        for(const [key,val] of Object.entries(emots)){
            emot_ls.push([key,val])
        }
        emot_ls.sort(function(a,b){return b[1]-a[1]})
        console.log("emot_ls:", emot_ls);
        return emot_ls;
    }
    
    return(
        <div style={{float: 'left', padding:'10px'}}>
            <div>
            {((typeof(props.sentiment)!=='undefined') && typeof(props.sentiment.Happy)!=='undefined')?emotions(props.sentiment).map((emot,i) =>(
                (<img className='emotion' style={{opacity:emot[1]+0.2}}src={`./assets/emotion_icons/${emot[0]}.svg`} /> )
                )):null}    
            </div>
        </div>
    )

}