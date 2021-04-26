
import axios from "axios";
export async function follow(user_id){
    let token = sessionStorage.getItem('access_token');
    let data = {user_id:user_id,action:'follow'};
    let head = {headers:{Authorization:"Bearer "+ token}}
    console.log("User follow attempt")
    axios.post("http://127.0.0.1:5000/follow_user",data,head);
}