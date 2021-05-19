import {Card,Toast,Row,Col,Container,Button,Form} from 'react-bootstrap';
// import { Container, Row, Col, Toast, CardColumns } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

require('dotenv').config()

export function CommentCol(props){

    const [new_comment, setComment] = useState("");
    const [comments,setComments] = useState([])
    function load_comments(props){
      axios.get(process.env.REACT_APP_BACKEND_URL + `/get_comments/${props.article_id}`,).then( result=> {
        if (result){
          setComments(result.data.comments)
        }
      })
    }
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      console.log(arr);
      return arr
    }
    

    function comment_toast(data){
      return  (
        <Toast align='left'>
        <Toast.Header>  
          <strong className="mr-auto">{data.user}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body style={{color:'gray'}}>{data.comment}</Toast.Body>
        <h4 >{data.comment}</h4>
        </Toast>
      );
    }

    function handleChange(t){ setComment(t.target.value) }

    function post_comment(){
      let data= {action:'add',comment:new_comment,article_id:props.id}
      let head = {headers:{Authorization:"Bearer "+ sessionStorage.getItem('access_token')}}
      console.log(head)
      axios.post(process.env.REACT_APP_BACKEND_URL + '/comment',data,head).then( result => {
      if (result){
            let new_toast = comment_toast({user:sessionStorage.getItem('user'),comment:new_comment})
            let temp = comments;
            temp[comments.length]=new_toast;
            setComments(shuffleArray(temp));
            setComment('');
        }
      });
    }

    let comment_toasts = props.comments.map((data, i) => {
        return (comment_toast(data));
      });
    comment_toasts = shuffleArray(comment_toasts)
    comment_toasts[comment_toasts.length]=((
      <Toast style={{paddingBottom:'17px'}}>
            <Toast.Body align='right'>
              <Row>
              <h5 position='left'  style={{color:'gray',float:'right',paddingRight:'80px',}} >New Comment</h5>
              </Row>
              <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows={2} onChange={handleChange} defaultValue='Say something nice, or not :/'/>
                </Form.Group>
              </Form>
            <Button  style={{float:'right'}} onClick={post_comment}>Post</Button>

            </Toast.Body>

          </Toast>
    ))
    comment_toasts.reverse();
    
    return (
        <div className="comments" style={{paddingTop:'10px', float:'right', paddingBottom:'10px',paddingRight:'20px'}}>
          {/* <h4>Comments</h4> */}
          <Col>{comment_toasts}</Col>
        </div>
    )
}

CommentCol.defaultProps = {
    comments :[
        {user:'jon doe',comment:'This article was great! '},
        {user:'jon doe',comment:'This writer is trash.  '},
        {user:'jon doe',comment:'The sentiment was 100% accurate '},
        {user:'jon doe',comment:'I completely disagree with the article '},
        {user:'jon doe',comment:'WOW. THIS IS THE BEST ARTICLE EVER!!! '}
    ]
}