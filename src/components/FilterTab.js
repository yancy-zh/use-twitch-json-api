import React from "react";
import { Button } from "antd";

const FilterTab = ({ title, icon, style, onClickCallBack }) => {
  return (
    <div>
      <Button icon={icon} style={style} onClick={onClickCallBack}>
        {title}
      </Button>
    </div>
  );
};

export default FilterTab;
