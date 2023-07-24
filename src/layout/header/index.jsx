import React, { useEffect, useState } from "react";
import icon from "../../assets/images/blackmoon.png";
import usericon from "../../assets/images/user-icon.png";
import { useNavigate } from 'react-router-dom';

import "./style.css";
import { Link } from "react-router-dom";
const Header = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() =>{
   let data = JSON.parse(localStorage.getItem('authUser'));
   setUserData(data)
  }, [])
  

  const onClickLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem("authUser");
    navigate('/')
  }
  
  return (
    <header>
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-6 col-ms-6 col-8">
            <Link to="/" className="text-decoration-none logo-main">
              <img src={icon} className="logo" alt="" />
              ticket toolkit <span> by FnF</span>
            </Link>
          </div>
          <div className="col-md-6 col-ms-6 col-4 text-end">
            <div className="user-main dropdown">
              <img
                src={(userData !== null && userData.avatar !== null) ? userData.avatar : usericon}
                className="logo dropdown-toggle"
                alt=""
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <h3 className="user-main d-inline-block">{userData !== null ? userData.username : 'Hello User'}</h3>
              <ul class="dropdown-menu">
                <li class="dropdown-item" onClick={(e) => onClickLogout(e)}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
