import React, { useEffect, useState } from "react";
import "./login.css";
import blackmoon from "../../assets/images/blackmoon.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URL } from "../../components/utils/config";
import Cookies from "js-cookie";
const Login = ({ props }) => {
  const search = useLocation().search;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    // let localObj = {
    //   username: "rehmanali",
    //   avatar: null,
    //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwOTc3NjI1NDQ5MTI5NzM4NDYiLCJpYXQiOjE2OTA1NDM5ODN9.7jlvfU26TGQQqwqVDTuwmK7vG8AM3QjNyq8u4dEfZ1w"
    // };
    // Cookies.set("authUser", JSON.stringify(localObj), { expires: 3 });

    let code = new URLSearchParams(search).get("code");
    // let authUser = JSON.parse(localStorage.getItem("authUser"));
    let authUser = {};
    if (Cookies.get("authUser") !== undefined) {
      authUser= JSON.parse(Cookies.get("authUser"));
    } else {
      authUser = null;
    }
  console.log("authUser", authUser)
    if (authUser?.username !== undefined) {
      navigate("/sales-view");
    }
    if (
      code !== null &&
      (authUser === null || authUser.username === undefined)
    ) {
      setLoader(true);
      axios
        .get(`${SERVER_URL}/api/user/authWithDiscord?code=${code}`)
        .then((res) => {
          setLoader(false);
         console.log(res.data.success, "res data===============")
          if (res.data.success === 1) {
            let obj = {
              username: res.data.userList.username,
              avatar: res.data.userList.avatar,
              token: res.data.token
            };
            // localStorage.setItem("authUser", JSON.stringify(obj));
            Cookies.set("authUser", JSON.stringify(obj), { expires: 3 });
            navigate("/sales-view");
          } else {

            axios.post(`${SERVER_URL}/api/liveSale/add-failure`, {
              username: authUser.username,
              content: "Not allow access"
            })
            .then(res => {
              console.log("res=====", res)
            })
            .catch(err =>  console.log(err))
            toast("Unauthorized!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          setLoader(false);
          toast("Server error!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "error",
          });
        });
    }
    // }
  }, []);

  const onClickBtn = (e) => {
    // window.location.href =
    //   "https://discord.com/api/oauth2/authorize?client_id=1131475096729567294&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20guilds%20guilds.members.read";
    window.location.href =
      "https://discord.com/api/oauth2/authorize?client_id=1131475096729567294&redirect_uri=https%3A%2F%2Ffnf-toolkit-00.vercel.app&response_type=code&scope=identify%20guilds%20guilds.members.read";
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
