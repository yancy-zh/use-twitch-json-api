import React from "react";
import { List } from "antd";
import "./BoardHeader.css";
const BoardHeader = () => {
  return (
    <div className="header-wrapper">
      <div className="title">TWITCH STREAMERS</div>
      <List />
      {/* three buttons for filtering programs */}
    </div>
  );
};

export default BoardHeader;
