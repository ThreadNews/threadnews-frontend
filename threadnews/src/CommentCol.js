import {Card,Toast,Row,Col,Container} from 'react-bootstrap';

export function CommentCol(props){

    const comments = props.comments.map((data, i) => {
    
        return (
            <Toast>
            <Toast.Header>  
              <strong className="mr-auto">{data.user}</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{data.comment}</Toast.Body>
          </Toast>
        );
      });

    return (
        <div className="comments">
            <Col>{comments}</Col>
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