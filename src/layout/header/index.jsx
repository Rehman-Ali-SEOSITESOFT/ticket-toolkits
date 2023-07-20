import React from "react";
import icon from "../../assets/images/blackmoon.png";
import usericon from "../../assets/images/user-icon.png";

import "./style.css";
const Header = () => {
  return (
    <header>
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-6 col-ms-6 col-8">
            <h2 className="logo-main">
              <img src={icon} className="logo" alt="" />
              ticket toolkit <span> by jamal</span>
            </h2>
          </div>
          <div className="col-md-6 col-ms-6 col-4 text-end">
            <h3 className="user-main">
              <img src={usericon} className="logo" alt="" />
              john
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
