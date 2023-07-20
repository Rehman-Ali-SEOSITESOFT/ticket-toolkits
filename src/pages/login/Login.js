import React from "react";
import "./login.css";
import blackmoon from "../../assets/images/blackmoon.png";
const Login = () => {
  return (
    <section className="login_wrapper">
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-6">
            <div className="content">
              <img src={blackmoon} alt="" className="img-fluid black_moon" />
              <h2>Ticket Toolkit</h2>
              <button>
                Updated Version available for purchase,plese contact me @ js @
                mal on discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
