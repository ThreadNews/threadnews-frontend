import axios from "axios";

export async function follow(user_id){
    let token = sessionStorage.getItem('access_token');
    let data = {user_id:user_id,action:'follow'};
    let head = {headers:{Authorization:"Bearer "+ token}}
    console.log("User follow attempt")
    axios.post("http://127.0.0.1:5000/follow_user",data,head);
}





export async function repost_article(articleId){
    let token = sessionStorage.getItem('access_token')
    let data = {action:'add',article_id:articleId}
    let head = {headers:{Authorization:"Bearer "+ token}}
    axios.post('http://127.0.0.1:5000/repost',data,head)
  }


export function like_article(articleId){
    let token = sessionStorage.getItem('access_token')
    let data = {action:'add',article_id:articleId}
    console.log("data:", data)
    let head = {headers:{Authorization:"Bearer "+ token}}
    axios.post('http://127.0.0.1:5000/like',data,head)
    
  }

export function save_article(articleId,saved){
    let data = { action: "add", article_id: articleId };
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    if (saved) {
        data.action = "delete";
    }
    axios.post("http://127.0.0.1:5000/save", data, head);
}


