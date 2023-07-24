import React, { useEffect, useState } from "react";
import "./login.css";
import blackmoon from "../../assets/images/blackmoon.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({ props }) => {
  const search = useLocation().search;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    let code = new URLSearchParams(search).get("code");
    let authUser = JSON.parse(localStorage.getItem("authUser"));
      if (authUser?.username !== undefined) {
        navigate("/sales-view");
      }
      if (code !== null && (authUser === null || authUser.username === undefined)) {
        setLoader(true);
        axios
          .get(`http://localhost:53134/api/user/authWithDiscord?code=${code}`)
          .then((res) => {
            setLoader(false);
            if (res.data.userList.username !== undefined) {
              let obj = {
                username: res.data.userList.username,
                avatar: res.data.userList.avatar,
              };
              localStorage.setItem("authUser", JSON.stringify(obj));
              navigate("/sales-view");
            }else{
              toast('Please try again login with Discord!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type: "error"
                });
            }
           
          })
          .catch((err) => {
            setLoader(false);
            toast('Please try again login with Discord!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: "error"
              });
          });
      }
    // }
  }, []);

  const onClickBtn = (e) => {
    // window.location.href =
    //   "https://discord.com/api/oauth2/authorize?client_id=1131475096729567294&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20guilds%20guilds.members.read";
    window.location.href="https://discord.com/api/oauth2/authorize?client_id=1131475096729567294&redirect_uri=https%3A%2F%2Ffnf-toolkit-00.vercel.app%2F&response_type=code&scope=identify%20guilds%20guilds.members.read";
  };

  return (
    <section className="login_wrapper">
     
      <div className="container-xxl">
      <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-10">
            <div className="content">
              <img src={blackmoon} alt="" className="img-fluid black_moon" />
              <h2>Ticket Toolkit</h2>
              <button onClick={(e) => onClickBtn(e)}>
                {loader ? "Loading..." : "Login with Discord"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
