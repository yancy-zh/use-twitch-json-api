import React from "react";
import "./Table.css";
const UserProfileLogo = ({ url, title }) => {
  return (
    <div className="user_profile">
      <img className="profile_img" src={url} alt={title} />
    </div>
  );
};

export default UserProfileLogo;
