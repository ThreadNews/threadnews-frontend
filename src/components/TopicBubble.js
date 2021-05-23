import React from "react";

export default function TopicBubble(props) {
  return (
    <div
      style={{
        backgroundColor: '#F0FFFFd0',
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
            pointerEvents: "none",
          }}
        >
          
          <p
            style={{
              color: '#2F4F4F', //"charcol",
              fontSize: 22,
              marginBottom: 30,
              marginTop:30,
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