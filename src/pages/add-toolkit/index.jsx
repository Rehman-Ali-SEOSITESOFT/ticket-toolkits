import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./search.css";
import Cookies from "js-cookie";

const AddToolkit = () => {
  const [searchResult, setSearchResult] = useState("");
  const navigate = useNavigate();
 
  const hanldeChangeInputResult = (event) => {
    setSearchResult(event.target.value);
  };
  useEffect(() => {
    // let user = JSON.parse(localStorage.getItem("authUser"));
    let user = {};
    if (Cookies.get("authUser") !== undefined) {
      JSON.parse(Cookies.get("authUser"));
    } else {
      user = null;
    }
    if (user === null && user?.username === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <section className="search-viewer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="sale-view-title">Event Viewer</h2>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-11 col-md-5 col-6">
            <div className="sale-view-search-input position-relative">
              <input
                type="text"
                placeholder="search event"
                value={searchResult}
                onChange={hanldeChangeInputResult}
              />
              <span className="sale-search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>

          <div className="col-lg-1  col-md-1 col-6">
            <Link
              to={`/search?search-result=£{searchResult}`}
              className="search-button text-decoration-none"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <div className="not-found">
              <p className="text-center text-white d-block h2 mb-4 w-100">
                No Event found
              </p>
              <button className="add-to-toolkit d-block">Add to Toolkit</button>
            </div>
            <div className="search-output-cards  d-flex flex-wrap">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddToolkit;
