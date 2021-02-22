import BubbleUI from 'react-bubble-ui'
//import bubbleMenu from './App';
import {useState, useEffect,useRef} from 'react'
import 'react-bubble-ui/dist/index.css';
import './css/bubbleSet.css';
import  axios from 'axios';
import {primary_color, secondary_color} from './Colors'
import { topic_data } from './topic_data.js'
import TopicBubble from './TopicBubble'
// #import Child from './ChildComponent';
//const axios = require('axios')
export default function CategoryBubbleSet(props){

    const options = {
		size: 180,
		minSize: 60,
		gutter: 20,
		provideProps: false,
		numCols: 3,
		fringeWidth: 120,
		yRadius: 150,
		xRadius: 600,
		cornerRadius: 50,
		// showGuides: true,
		compact: true,
		gravitation: 5
	}	
	// let data = props.data;
	// let b = Array.from(data.topic_bubble_data);
	// // var interests = [];
	// console.log(b);
	console.log(topic_data);
	const children = topic_data.map((data, i) => {
		console.log("dd")
        // return <TopicBubble {...data} key={i} className='child' onClick={()=>add_interest(data.logo_path.slice(0,-4))} />
		return <TopicBubble {...data} key={i} className='child'  onClick={()=>props.add_interest(data.topic)}/>
    });

   return (<BubbleUI options={options} className="bubbleSet">
       {children}
   </BubbleUI>)
}
