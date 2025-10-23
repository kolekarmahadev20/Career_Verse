import React from "react";
import "./RightSidebar.css";
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";
// import ChatGPTBot from "../Chatbot";

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <Widget />
      <WidgetTags />
      {/* <ChatGPTBot /> */}
    </aside>
  );
};

export default RightSidebar;
