import React, { useState } from "react";
import "./sale-viewer.css";

import masjid from "../../assets/images/faisal-masjid.jpg";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const SaleViewer = () => {
  const [searchResult, setSearchResult] = useState("");
  const [cards, setCarts] = useState([1, 2, 3, 4, 5, 1, 1, 1, 1, 2, 3]);
  const [cardStarted, setCardStarted] = useState(0);
  const [cardEnded, setCardEnded] = useState(5);

  const [opedPopUp, setOpedPopUp] = useState(false);

  const hanldeClose = () => {
    setOpedPopUp(false);
  };
  const hanldeOpened = () => {
    setOpedPopUp(true);
  };
  const hanldeChangeInputResult = (event) => {
    setSearchResult(event.target.value);
  };

  const hanlderShowMoreSales = () => {
    setCardEnded(cardEnded + 5);
  };
  const hanlderGoBacked = () => {
    setCardEnded(5);
    window.scrollTo(0, 0);
  };
  const data = [
    {
      name: " A",
      uv: 4000,
    },
    {
      name: " B",
      uv: 3000,
    },
    {
      name: " C",
      uv: 2000,
    },
    {
      name: " D",
      uv: 2780,
    },
    {
      name: " E",
      uv: 1890,
    },
    {
      name: " F",
      uv: 2390,
    },
    {
      name: " G",
      uv: 3490,
    },
  ];

  /// SCATTER CHART
  const data01 = [
    {
      x: 100,
      y: 200,
      z: 200,
    },
    {
      x: 120,
      y: 100,
      z: 260,
    },
    {
      x: 170,
      y: 300,
      z: 400,
    },
    {
      x: 140,
      y: 250,
      z: 280,
    },
    {
      x: 150,
      y: 400,
      z: 500,
    },
    {
      x: 110,
      y: 280,
      z: 200,
    },
  ];
  const data02 = [
    {
      x: 200,
      y: 260,
      z: 240,
    },
    {
      x: 240,
      y: 290,
      z: 220,
    },
    {
      x: 190,
      y: 290,
      z: 250,
    },
    {
      x: 198,
      y: 250,
      z: 210,
    },
    {
      x: 180,
      y: 280,
      z: 260,
    },
    {
      x: 210,
      y: 220,
      z: 230,
    },
  ];

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
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>

            <div className="search-output-cards mt-5 d-flex flex-wrap">
              {cards.slice(cardStarted, cardEnded).map((e, i) => {
                return (
                  <div className="output-card" key={i}>
                    <div className="output-cart-image">
                      <img src={masjid} alt="" className="img-fluid" />
                    </div>
                    <div className="output-cart-content">
                      <h2 className="title">
                        miami doplhins vs kansas city chiefs- nfl frankfurt
                        games 2023 miami doplhins vs kansas city chiefs- nfl
                        frankfurt games 2023
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
            <div className="show-more-sales">
              {cards.length <= cardEnded ? (
                <button onClick={hanlderGoBacked}>
                  No More Content Go Back
                </button>
              ) : (
                <button onClick={hanlderShowMoreSales}>Show More</button>
              )}
            </div>
          </div>
        </div>
        <div className="row graphic">
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-end mb-5">
              <div>
                <h2 className="heading">Event Sale</h2>
                <p className="recordss"> 225 Sale (s) found</p>
              </div>
              <h2 className="text-right time-right">last updated: 21 :30 PM</h2>
            </div>
            <div className="event-sales-wrapper">
              <ResponsiveContainer width={"100%"} height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    tick={{ fill: "white" }}
                    dataKey="x"
                    type="number"
                    name="stature"
                    unit="cm"
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
                    name="weight"
                    unit="kg"
                    tick={{ fill: "white" }}
                  />
                  <ZAxis
                    dataKey="z"
                    type="number"
                    range={[64, 144]}
                    name="score"
                    unit="km"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter name="A school" data={data01} fill="#8884d8" />
                  <Scatter name="B school" data={data02} fill="#82ca9d" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="enevt-cards-disc">
              <button className="my-4 my-md-5" onClick={hanldeOpened}>
                {" "}
                view all recent sales
              </button>
              <div className="d-flex event-cardss flex-wrap">
                <div className="cart">
                  <h4 className="title">Avg. Price</h4>
                  <p className="total-price"> $900</p>
                </div>
                <div className="cart">
                  <h4 className="title">Last. House</h4>
                  <p className="total-price"> $900</p>
                </div>
                <div className="cart">
                  <h4 className="title">Lasr 24 Hrs</h4>
                  <p className="total-price"> $900</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-end mb-5 mt-md-0 mt-3">
              <div>
                <h2 className="heading">Event Listings</h2>
                <p className="recordss"> 1475 listing (s) found</p>
              </div>
              <h2 className="text-right time-right">last updated: 21 :30 PM</h2>
            </div>
            <div className="event-listings-wrapper">
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: "white" }} />
                  <YAxis tick={{ fill: "white" }} />
                  <Tooltip />
                  <Legend cursor={false} />
                  {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="enevt-cards-disc">
              <div className="d-flex event-cardss">
                <div className="cart">
                  <h4 className="title">Avg. Price</h4>
                  <p className="total-price"> $900</p>
                </div>
                <div className="cart">
                  <h4 className="title">Last. House</h4>
                  <p className="total-price"> $900</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {opedPopUp && (
        <React.Fragment>
          <div className="event-sale-overlay" onClick={hanldeClose}></div>
          <div className="event-sale-listing">
            <div className="event-sale-detail" id="style-1">
              <span className="closed-popup" onClick={hanldeClose}>
                <i class="fa-solid fa-xmark"></i>
              </span>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th> Date </th>
                    <th> Customer </th>
                    <th> Sales </th>
                    <th> Total </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, i) => {
                    return (
                      <tr key={i}>
                        <td> 12 Nov 2022 </td>
                        <td> John </td>
                        <td> Pending </td>
                        <td> $2391 </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th> Date </th>
                    <th> Customer </th>
                    <th> Sales </th>
                    <th> Total </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* </div> */}
        </React.Fragment>
      )}
    </section>
  );
};

export default SaleViewer;