import React from "react";
import { Button } from "antd";

const FilterTab = ({ title, icon, style }) => {
  return (
    <div>
      <Button icon={icon} style={style}>
        {title}
      </Button>
    </div>
  );
};

export default FilterTab;
