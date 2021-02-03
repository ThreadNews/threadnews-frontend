import React from "react";

export default function TopicBubble(props) {
  // console.log(props);
  return (
    <div
      style={{
        backgroundColor: props.bg_color+ "d0",
      }}
       className={"TopicBubble"}
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
          <img
            src={`./assets/categoryIcons/${props.logo_path}`}
            alt=""
            style={{
              width: 90,
              borderRadius: 5,
              marginTop:20,
              marginBottom: 5,
            }}
          ></img>
          <p
            style={{
              color: "white",
              fontSize: 18,
              marginBottom: 6,
              fontWeight: 1000,
              maxWidth: 150,
              textAlign: "center",
            }}
          >
            {props.logo_path.slice(0,-4)}
          </p>
          <p
            style={{
              color: "white",
              fontSize: 16,
              marginBottom: 5,
              maxWidth: 100,
              opacity: 0.4,
            }}
          >
            {/* {props.symbol} */}
          </p>
        </div>
      ) : null}
    </div>
  );
}