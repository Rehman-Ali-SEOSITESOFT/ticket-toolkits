import React, { useState } from "react";
import "./sale-viewer.css";

import masjid from "../../assets/images/faisal-masjid.jpg";
const SaleViewer = () => {
  const [searchResult, setSearchResult] = useState("");
  const hanldeChangeInputResult = (event) => {
    setSearchResult(event.target.value);
  };
  return (
    <section className="sale-viewer">
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <h2 className="sale-view-title">Sales Viewer</h2>
            <div className="sale-view-search-input position-relative">
              <input
                type="text"
                placeholder="Seach by viagogo link"
                value={searchResult}
                onChange={hanldeChangeInputResult}
              />
              <span className="sale-search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>

            <div className="search-output-cards mt-5 d-flex flex-wrap">
              {[1, 2, 3, 4, 5].map((e) => {
                return (
                  <div className="output-card" key={e}>
                    <div className="output-cart-image">
                      <img src={masjid} alt="" className="img-fluid" />
                    </div>
                    <div className="output-cart-content">
                      <h2 className="title">
                        miami doplhins vs kansas city chiefs- nfl frankfurt
                        games 2023
                      </h2>
                      <address className="address">
                        {" "}
                        deutsche bank park ( commerzbank arena) frankfurt,
                        germany
                      </address>
                      <p className="weekname"> Sunday, 05 nov 2023 03:30 PM </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleViewer;
