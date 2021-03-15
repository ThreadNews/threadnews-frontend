import React from "react";

export default function TopicBubble(props) {
  return (
    <div
      style={{
        backgroundColor: '#F0FFFF' + "d0",
      }}
       className={"TopicBubble"}
       onClick={props.onClick}
    >
      {true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.1s ease",
            // opacity: props.bubbleSize > 50 ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          
          <p
            style={{
              color: '#2F4F4F', //"charcol",
              fontSize: 22,
              marginBottom: 50,
              marginTop:50,
              fontWeight: 1000,
              maxWidth: 100,
              textAlign: "center",
            }}
          >
            {props.topic}
          </p>         
        </div>
      ) : null}
    </div>
  );
}