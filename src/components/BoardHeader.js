import React from "react";

import "./BoardHeader.css";
import FilterTab from "./FilterTab";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TvIcon from "@mui/icons-material/Tv";
import TvOffIcon from "@mui/icons-material/TvOff";
const BoardHeader = () => {
  const styles = {
    divStyle1: { backgroundColor: "red", width: "100px" },
    divStyle2: { backgroundColor: "#4CAF50", width: "100px" },
    divStyle3: { backgroundColor: "royalblue", width: "100px" },
  };
  return (
    <div className="header-wrapper">
      <div className="title">TWITCH STREAMERS</div>
      {/* three buttons for filtering programs */}
      <div className="filters">
        <FilterTab
          title="all"
          icon={<DoneAllIcon />}
          style={styles.divStyle1}
        />
        <FilterTab title="online" icon={<TvIcon />} style={styles.divStyle2} />
        <FilterTab
          title="offline"
          icon={<TvOffIcon />}
          style={styles.divStyle3}
        />
      </div>
    </div>
  );
};

export default BoardHeader;
