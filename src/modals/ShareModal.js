/**
 * creates popup modal which gives user option to share to other platforms
 * share to twitter reddit, facebook
 *
 * @summary Sharing modal
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:19:55 
 * Last modified  : 2021-05-28 22:21:24
 */

//react imports
import React from "react";
import { Button, Modal } from "react-bootstrap";
//external imports
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  RedditShareButton,
  RedditIcon,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
//css imports
import "../css/modal.css";

export function ShareModal(article) {
  function SocialMediaButtons() {
    return (
      <div align="center" padLeft={"10px"}>
        <FacebookShareButton
          url={article.url}
          quote={article.title}
          hashtag="#threadNews"
        >
          <FacebookIcon size={36} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={article.url}
          via={"ThreadNews"}
          hashtags={["threadNews"]}
          title={article.title}
        >
          <TwitterIcon size={36} round={true} />
        </TwitterShareButton>

        <RedditShareButton url={article.url} title={article.title}>
          <RedditIcon size={36} round={true} />
        </RedditShareButton>
        <LinkedinShareButton
          url={article.url}
          description={article.description}
          title={article.title}
          source={article.url}
        >
          <LinkedinIcon size={36} round={true} />
        </LinkedinShareButton>
      </div>
    );
  }

  function copy_link_button() {
    return (
      <div align={"center"}>
        <Button
          variant="info"
          onClick={() => {
            navigator.clipboard.writeText(article.url);
          }}
        >
          Copy to Clipboard
        </Button>
        <h5>Or</h5>
      </div>
    );
  }

  return (
    <Modal show={true} onHide={() => article.setShare(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Share This Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {copy_link_button()}
          <SocialMediaButtons />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => article.setShare(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShareModal;
