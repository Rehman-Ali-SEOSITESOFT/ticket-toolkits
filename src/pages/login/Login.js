import React from "react";
import "./login.css";
import blackmoon from "../../assets/images/blackmoon.png";
const Login = () => {
  return (
    <section className="login_wrapper">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-10">
            <div className="content">
              <img src={blackmoon} alt="" className="img-fluid black_moon" />
              <h2>Ticket Toolkit</h2>
              <button>Login with Discord</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
