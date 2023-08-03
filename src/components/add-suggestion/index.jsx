import React, { useState } from "react";
import "./add-suggest.css";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddSuggestion = () => {
  const [value, setValue] = useState("");
  const [evetnListingPop, setEvetnListingPop] = useState(false);

  const sendMessage = () => {
    const user = JSON.parse(Cookies.get("authUser"));
    const config = { headers: { "x-auth-token": user.token } };
    axios
      .post(
        `${SERVER_URL}/api/liveSale/add-suggestion`,
        {
          username: user.username,
          content: value,
        },
        config
      )
      .then((res) => {
        hanldeEventListingPopUPClosed();
        toast("Your suggestion has been sent to the team.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: "success",
        });
      })
      .catch((err) =>
        toast("server error, try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: "error",
        })
      );
  };

  const hanldeEventListingPopUPClosed = () => {
    setEvetnListingPop(false);
    document.querySelector("body").style.overflow = "auto";
  };

  const hanldeEventListingPopUPOpened = () => {
    document.querySelector("body").style.overflow = "hidden";
    setEvetnListingPop(true);
  };
  return (
    <div className="not-found">
      <ToastContainer />
      <p className="text-center text-white d-block h2 mb-4 w-100">
        Add Your Suggestion
      </p>
      <button
        className="add-to-toolkit d-block"
        onClick={() => hanldeEventListingPopUPOpened()}
      >
        Add Suggestion
      </button>
      {evetnListingPop && (
        <React.Fragment>
          <div
            className="event-sale-overlay"
            onClick={hanldeEventListingPopUPClosed}
          ></div>
          <div className="event-sale-listing">
            <div className="event-sale-detail addsuggest">
              <div className="d-flex align-items-center my-2">
                <div className="col-6 suggestion">
                  <h2 className="popup-title ">Add your suggestion</h2>
                </div>
                <div className="col-6 text-end">
                  <span
                    className="closed-popup"
                    onClick={hanldeEventListingPopUPClosed}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <div className="add-suggestion">
                <textarea
                  className="text-are"
                  onChange={(e) => setValue(e.target.value)}
                />
                <button
                  onClick={() => sendMessage()}
                  className="search-button text-decoration-none border-outline-none mt-2"
                >
                  Add Suggestion
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default AddSuggestion;
