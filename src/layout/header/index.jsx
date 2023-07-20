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
            <div className="user-main dropdown">
              <img
                src={usericon}
                className="logo dropdown-toggle"
                alt=""
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <h3 className="user-main d-inline-block">john</h3>
              <ul class="dropdown-menu">
                <li class="dropdown-item">Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
