import BubbleUI from "react-bubble-ui";

import "react-bubble-ui/dist/index.css";
import "./css/bubbleSet.css";

import { topic_data } from "./topic_data.js";
import TopicBubble from "./TopicBubble";

export default function CategoryBubbleSet(props) {
  const options = {
    size: 180,
    minSize: 100,
    gutter: 30,
    provideProps: false,
    numCols: 4,
    fringeWidth: 120,
    yRadius: 150,
    xRadius: 600,
    cornerRadius: 50,
    // showGuides: true,
    compact: true,
    gravitation: 5,
  };

  const children = topic_data.map((data, i) => {
    return (
      <TopicBubble
        {...data}
        key={i}
        className="child"
        onClick={() => props.add_interest(data.topic)}
      />
    );
  });

  return (
    <BubbleUI options={options} className="bubbleSet">
      {children}
    </BubbleUI>
  );
}
