import BubbleUI from "react-bubble-ui";

import "react-bubble-ui/dist/index.css";
import "../css/bubbleSet.css";

import { topic_data } from "../data/topic_data.js";
import TopicBubble from "./TopicBubble";

export default function CategoryBubbleSet(props) {
  let topics = topic_data;
  let options = {
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
  if (props.row) {
    options.gutter = 20;
    options.numCols = 5;
    options.numRows = 1;
    options.size = 120;
    options.minSize = 80;
    topics = props.interests;
    options.gravitation = 0;
  }

  let children = null;
  if (!props.row) {
    children = topics.map((data, i) => {
      return (
        <TopicBubble
          {...data}
          key={i}
          className="child"
          onClick={() => props.add_interest(data.topic)}
        />
      );
    });
  } else {
    children = topics.map((data, i) => {
      return (
        <TopicBubble
          topic={data}
          key={i}
          className="child"
          onClick={() => props.add_interest(data.topic)}
        />
      );
    });
  }

  return (
    <BubbleUI options={options} className="bubbleSet">
      {children}
    </BubbleUI>
  );
}
