import React from "react";
import "./social.css";
const SocialAccountDetail = ({ icon, title, value }) => {
  return (
    <li className="item ">
      <div className="icon">
        <img src={icon} alt="" className="img-fluid" />
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="value">
        <span>{value}</span>
      </div>
    </li>
  );
};

export default SocialAccountDetail;
