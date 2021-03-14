import {Card,Toast,Row,Col,Container,Button,Form} from 'react-bootstrap';
// import { Container, Row, Col, Toast, CardColumns } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
export function CommentCol(props){

    const [new_comment, setComment] = useState("");
    const [comments,setComments] = useState([])
    function load_comments(props){
      axios.get(`http://127.0.0.1:5000/get_comments/${props.article_id}`,).then( result=> {
        if (result){
          setComments(result.data.comments)
        }
      })
    }

    function comment_toast(data){
      return  (
        <Toast align='left' style={{backgroundColor:'#DC8E8F'}}>
        <Toast.Header style={{backgroundColor:'#DC8E8F'}}>  
          <strong className="mr-auto">{data.user}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{data.comment}</Toast.Body>
        </Toast>
      );
    }

    function handleChange(t){ setComment(t.target.value) }

    function post_comment(){
      axios.post(`http://127.0.0.1:5000/new_comment/${props.id}`,{comment:new_comment}).then( result => {
      if (result){
            let new_toast = comment_toast({user:localStorage.getItem('user'),comment:new_comment})
            comments.append(new_toast)
        }
      });
    }

    let comment_toasts = props.comments.map((data, i) => {
        return (comment_toast(data));
      });
    comment_toasts.append=((
      <Toast align='left' style={{backgroundColor:'#DC8E8F'}}>
            <Toast.Body align='right'>
              <h4 align='left'>New Comment</h4>

              <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows={3} onChange={handleChange} />
                </Form.Group>
              </Form>
              <Button onClick={post_comment}>Post</Button>
            </Toast.Body>
          </Toast>
    ))

    return (
        <div className="comments" align="center" style={{paddingTop:'10px', paddingBottom:'10px'}}>
          <h4>Comments</h4>
          <Col>{comment_toasts}</Col>
        </div>
    )
}

CommentCol.defaultProps = {
    comments :[
        {user:'jon doe',comment:'This article was great! '},
        {user:'jon doe',comment:'This writter is trash.  '},
        {user:'jon doe',comment:'The sentiment was 100% accurate '},
        {user:'jon doe',comment:'I completely disagree with the article '},
        {user:'jon doe',comment:'WOW. THIS IS THE BEST ARTICLE EVER!!! '}
    ]
}