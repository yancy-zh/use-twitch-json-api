import React from "react";
import "./BoardHeader.css";
const BoardHeader = () => {
  const styles = {
    divStyle1: { backgroundColor: "red", width: "100px" },
    divStyle2: { backgroundColor: "#4CAF50", width: "100px" },
    divStyle3: { backgroundColor: "royalblue", width: "100px" },
  };
  return (
    <div className="header-wrapper">
      <div className="title">TWITCH STREAMERS</div>
    </div>
  );
};

export default BoardHeader;
