import React from "react";
import "./social.css";
const SocialAccountDetail = ({ icon, title, value }) => {
  const Calculate = () => {
    const thousand = 1000;
    const million = 1000000;
    let convertIntoThousand = value / thousand;

    let convertIntoMilion = value / million;

    if (value < thousand) {
      return value;
    } else {
      if (value < million) {
        return convertIntoThousand.toFixed(2) + "k";
      } else {
        return convertIntoMilion.toFixed(2) + "M";
      }
    }
  };

  return (
    <li className="item ">
      <div className="icon">
        <img src={icon} alt="" className="img-fluid" />
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="value">
        <span>{Calculate(value)}</span>
      </div>
    </li>
  );
};

export default SocialAccountDetail;
