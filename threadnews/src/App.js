import CategoryBubbleSet from './category-bubbles'
import './App.css';
import  axios from 'axios';
import Top_nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
// import "Welcome.css";
//import Child from './Childcompent';
//import Navbar from 'react-bootstrap/Navbar';
const test_data = [{"name":"policy","backgroundColor":"#EE1B2D","textColor": "white"}]
//function NavBar() {}



//export default function bubbleMenu()
  async function fetch_category_bubble_data(){
   try{
     let d;
     const r = await axios.get("http://localhost:5000/categoryBubbleData")
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        d = response.data
        return response.data.topic_bubble_data
      });
      
      return r;
     
   }
   catch(error){
     console.log(error)
     return false
   }
 }



function App() {
  let bubble_data = fetch_category_bubble_data()
  //console.log(bubble_data)
  return (
    <div className="App" width='100%'>
      {Top_nav()}
      <header className="App-header" width='100%'>
        {/* <p style = 'textAlign:left'>
          Welcome to ThreadNews
        </p> */}
        
        {/* <p className="welcome">Welcom to ThreadNews!</p> */}
        <p style={{
              color: "white",
              fontSize: 32,
              marginBottom: 5,
              opacity: 0.4}}>
          Lets get you started, Please select topics that interest you 
        </p>
        {CategoryBubbleSet({data:{"topic_bubble_data": [{"logo_path": "weather.svg", "bg_color": "#68C56A"}, {"logo_path": "Soccer.svg", "bg_color": "#68B1C5"}, {"logo_path": "photography.svg", "bg_color": "#C568B1"}, {"logo_path": "android.svg", "bg_color": "#68B1C5"}, {"logo_path": "music.svg", "bg_color": "#A268C5"}, {"logo_path": "drawing.svg", "bg_color": "#C3C568"}, {"logo_path": ".DS_Store", "bg_color": "#8BC568"}, {"logo_path": "Podcasts.svg", "bg_color": "#B468C5"}, {"logo_path": "travel.svg", "bg_color": "#C3C568"}, {"logo_path": "stocks.svg", "bg_color": "#C5688B"}, {"logo_path": "Esports.svg", "bg_color": "#B468C5"}, {"logo_path": "TV.svg", "bg_color": "#C5A268"}, {"logo_path": "crypto.svg", "bg_color": "#68C3C5"}, {"logo_path": "Cars.svg", "bg_color": "#C5688B"}, {"logo_path": "movies.svg", "bg_color": "#68C3C5"}, {"logo_path": "finance.svg", "bg_color": "#6879C5"}, {"logo_path": "Surfing.svg", "bg_color": "#B1C568"}, {"logo_path": "ocean.svg", "bg_color": "#68B1C5"}, {"logo_path": "Housing.svg", "bg_color": "#C568C3"}, {"logo_path": "Football.svg", "bg_color": "#C56879"}, {"logo_path": "voting.svg", "bg_color": "#7C68C5"}, {"logo_path": "cloud.svg", "bg_color": "#7C68C5"}, {"logo_path": "Videogames.svg", "bg_color": "#C56879"}, {"logo_path": "math.svg", "bg_color": "#8F68C5"}, {"logo_path": "diy.svg", "bg_color": "#688BC5"}, {"logo_path": "Psychology.svg", "bg_color": "#C3C568"}, {"logo_path": "Hockey.svg", "bg_color": "#8F68C5"}, {"logo_path": "Wearables.svg", "bg_color": "#C5A268"}, {"logo_path": "computers.svg", "bg_color": "#C3C568"}, {"logo_path": "privacy.svg", "bg_color": "#C568C3"}]}})}
        
      </header>
    </div>
  );
}

export default App;
