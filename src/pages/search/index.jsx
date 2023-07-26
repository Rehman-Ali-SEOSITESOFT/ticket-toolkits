import React, { useState, useEffect } from "react";
import masjid from "../../assets/images/faisal-masjid.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import "./search.css";
import NotFound from "../../components/not-found";
import axios from "axios";
import { SERVER_URL } from "../../components/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundImage from "../../assets/images/not-found.jpg";
import moment from "moment";
const SearchResult = () => {
  const [searchResult, setSearchResult] = useState("");
  const search = useLocation().search;
  let query = new URLSearchParams(search).get("query");

  const [cards, setCarts] = useState([1, 2, 3, 4, 5, 1, 1, 1, 1, 2, 3]);
  const [opedPopUp, setOpedPopUp] = useState(false);
  const [evetnListingPop, setEvetnListingPop] = useState(false);
  const [queryData, setQueryData] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [loader, setLoader] = useState(false);
  const [eventListing, setEventListing] = useState({});
  const [eventListingLoader, setEventListinLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("authUser"));
    if (user === null && user?.username === undefined) {
      navigate("/");
    }
  }, []);
  const hanldeClose = () => {
    setOpedPopUp(false);
    document.querySelector("body").style.overflow = "auto";
  };
  const hanldeOpened = () => {
    document.querySelector("body").style.overflow = "hidden";
    setOpedPopUp(true);
  };
  const hanldeEventListingPopUPClosed = () => {
    setEvetnListingPop(false);
    document.querySelector("body").style.overflow = "auto";
  };
  const hanldeEventListingPopUPOpened = () => {
    document.querySelector("body").style.overflow = "hidden";
    setEvetnListingPop(true);
  };
  const hanldeChangeInputResult = (event) => {
    setSearchResult(event.target.value);
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

  const data02 = [
    {
      x: 10,
      y: 50,
      z: 10,
    },
    {
      x: 40,
      y: 100,
      z: 260,
    },
    {
      x: 70,
      y: 150,
      z: 400,
    },
    {
      x: 100,
      y: 250,
      z: 280,
    },
    {
      x: 130,
      y: 230,
      z: 500,
    },
    {
      x: 150,
      y: 350,
      z: 200,
    },
  ];
  const [eventSaleGraphData, setEventSaleGraphData] = useState([]);
  const data01 = [
    {
      x: "Jan",
      y: 200,
      z: 240,
    },
    {
      x: "Jan",
      y: 300,
      z: 240,
    },
    {
      x: "Feb",
      y: 290,
      z: 220,
    },
    {
      x: "Mar",
      y: 290,
      z: 250,
    },
    {
      x: "April",
      y: 250,
      z: 210,
    },
    {
      x: "May",
      y: 280,
      z: 260,
    },
    {
      x: "Jun",
      y: 220,
      z: 230,
    },
    {
      x: "Jul",
      y: 220,
      z: 230,
    },
    {
      x: "Aug",
      y: 220,
      z: 230,
    },
    {
      x: "Sep",
      y: 220,
      z: 230,
    },
    {
      x: "Oct",
      y: 220,
      z: 230,
    },
    {
      x: "Nov",
      y: 220,
      z: 230,
    },
    {
      x: "Dec",
      y: 220,
      z: 230,
    },
  ];

  useEffect(() => {
    if (query) {
      let q = query?.split("/");
      let search_query = q[q.length - 1].slice(2, 100);
      setLoader(true);
      axios
        .get(`${SERVER_URL}/api/liveSale/search-event?query=${search_query}`)
        .then((res) => {
          console.log(res.data.data, "res.data.data.success======");
          if (res.data.success === 0) {
            setIsNotFound(true);
            toast("Not found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: "error",
            });
          } else {
            setQueryData(res.data.data);
            setIsNotFound(false);
            // let grapArr = []
            // let totalsales = [...res.data.data.previouSales, ...res.data.data.recentSales];
            // for(var s=0; s < totalsales.length; s++){
            //   console.log( "month======")
            // }
          }
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          toast("Invalid request.Please try again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "error",
          });
        });
    } else {
      setIsNotFound(true);
    }
  }, []);

  const onClickSearch = () => {
    navigate(`/search?query=${searchResult}`);
    let q = searchResult.split("/");
    let search_query = q[q.length - 1].slice(2, 100);
    setLoader(true);
    axios
      .get(`${SERVER_URL}/api/liveSale/search-event?query=${search_query}`)
      .then((res) => {
        if (res.data.data.success === 0) {
          setIsNotFound(true);
          toast("Not found!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "error",
          });
        } else {
          setQueryData(res.data.data);
          setIsNotFound(false);
          let grapArr = [];
          let totalsales = [
            ...res.data.data.previousSales,
            ...res.data.data.recentSales,
          ];
          console.log(totalsales, "total salwes");
          for (var s = 0; s < totalsales.length; s++) {
            let obj = {
              x: totalsales[s].time_checked,
              y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
            };
            grapArr.push(obj);
          }
          setEventSaleGraphData(grapArr);

          // get event listing
          setEventListinLoader(true);
          axios
            .get(
              `${SERVER_URL}/api/listings/event-listing?query=${search_query}`
            )
            .then((res) => {
              console.log(res.data.data, "event listing");
              setEventListing(res.data.data);
              setEventListinLoader(false);
            })
            .catch((err) => {
              console.log("erro in event listing");
              setEventListing({});
              setEventListinLoader(false);
            });
        }
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        toast("Invalid request.Please try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: "error",
        });
      });
  };

  console.log(eventSaleGraphData, "=================");
  return (
    <section className="search-viewer">
      <ToastContainer />
      {loader ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="sale-view-title">Loading...</h2>
            </div>
          </div>
        </div>
      ) : isNotFound ? (
        <>
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
                    placeholder="search by viagogo link"
                    value={searchResult}
                    onChange={hanldeChangeInputResult}
                  />
                  <span className="sale-search-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>

              <div className="col-lg-1  col-md-1 col-6">
                <button
                  className="search-button text-decoration-none"
                  onClick={() => onClickSearch()}
                >
                  Search
                </button>
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
                  <button className="add-to-toolkit d-block">
                    Add to Toolkit
                  </button>
                </div>
                <div className="search-output-cards  d-flex flex-wrap"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="sale-view-title">Event Viewer</h2>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-5 col-6">
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
              </div>

              <div className="col-lg-1 col-md-1 col-6">
                <button
                  className="search-button text-decoration-none"
                  onClick={() => onClickSearch()}
                >
                  Search
                </button>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <div className="filter-by-wrapper d-flex justify-content-between align-items-center">
                  <h1 className="filter-by"> Filter by: </h1>
                  <select name="" id="" className="form-select">
                    <option value="">row </option>
                    <option value="">row 1</option>
                    <option value="">row 2 </option>
                  </select>
                  <select name="" id="" className="form-select">
                    <option value="">seat type </option>
                    <option value="">seat type 1</option>
                    <option value="">seat type 2</option>
                  </select>

                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
          </div>

          <div className="container-xxl">
            <div className="row">
              <div className="col">
                <div className="search-output-cards  mt-5 d-flex flex-wrap">
                  <div className="output-card">
                    <div className="mulit-output-cart-image d-flex justify-content-between">
                      <div className="left-side">
                        <img
                          src={
                            queryData?.artist_image !== null
                              ? queryData?.artist_image
                              : NotFoundImage
                          }
                          alt="artist image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="right-side">
                        <img
                          src={
                            queryData?.seatmap !== null
                              ? queryData?.seatmap
                              : NotFoundImage
                          }
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="output-cart-content">
                      <h2 className="title">
                        miami doplhins vs kansas city chiefs- nfl frankfurt
                        games 2023 miami doplhins vs kansas city chiefs- nfl
                        frankfurt games 2023
                      </h2>
                      <address className="address">
                        deutsche bank park ( commerzbank arena) frankfurt,
                        germany
                      </address>
                      <p className="weekname">Sunday, 05 nov 2023 03:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-xxl">
            <div className="row graphic">
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-end mb-5">
                  <div>
                    <h2 className="heading">Previous Sale</h2>
                    <p className="recordss">
                      {" "}
                      {queryData?.total_sales ? queryData?.total_sales : 0} Sale
                      (s) found
                    </p>
                  </div>
                  <h2 className="text-right time-right">
                    last updated:{" "}
                    {queryData?.time_checked
                      ? queryData?.time_checked[
                          queryData?.time_checked.length - 1
                        ]
                      : "01:00 AM"}
                  </h2>
                </div>
                <div className="event-sales-wrapper">
                  <ResponsiveContainer width={"100%"} height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        tick={{ fill: "#121823" }}
                        dataKey="x"
                        name="Date"
                        unit=""
                      />
                      <YAxis
                        dataKey="y"
                        type="number"
                        name="Price"
                        unit="£"
                        tick={{ fill: "white" }}
                      />

                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Legend />
                      {/* <Scatter name="Event Sale" data={data01} fill="#8884d8" /> */}
                      <Scatter
                        name="Event Sale"
                        data={eventSaleGraphData}
                        fill="#8884d8"
                      />
                      {/* <Scatter name="Date" data={data02} fill="#82ca9d" /> */}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="enevt-cards-disc">
                  <button className="my-4 my-md-5" onClick={hanldeOpened}>
                    view all recent sales
                  </button>
                  <div className="d-flex event-cardss flex-wrap">
                    <div className="cart">
                      <h4 className="title">Avg. Price</h4>
                      <p className="total-price">
                        
                        £ {queryData?.average ? queryData?.average?.toFixed(2) : 0}
                      </p>
                    </div>
                    <div className="cart">
                      <h4 className="title">Last. Hour</h4>
                      <p className="total-price"> £ 900</p>
                    </div>
                    <div className="cart">
                      <h4 className="title">Last 24 Hours</h4>
                      <p className="total-price"> £ 900</p>
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
                  <h2 className="text-right time-right">
                    last updated: 21 :30 PM
                  </h2>
                </div>
                <div className="event-listings-wrapper">
                  {eventListingLoader ? (
                    <h2 className="heading">Loading...</h2>
                  ) : (
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart data={data01}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" tick={{ fill: "white" }} />
                        <YAxis unit="£" tick={{ fill: "white" }} />
                        <Tooltip />
                        <Legend cursor={false} />
                        <Bar dataKey="y" name="Event Listing" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                {/* <div className="enevt-cards-disc ">
            <div className="d-flex event-cardss mt-3 justify-content-center flex-wrap">
              <div className="cart">
                <h4 className="title">Avg. Price</h4>
                <p className="total-price"> £ 900</p>
              </div>
              <div className="cart">
                <h4 className="title">Last. Hour</h4>
                <p className="total-price"> £ 900</p>
              </div>
            </div>
          </div> */}
                <div className="enevt-cards-disc">
                  <button
                    className="my-4 my-md-5"
                    onClick={hanldeEventListingPopUPOpened}
                  >
                    view all event listings
                  </button>
                  <div className="d-flex event-cardss flex-wrap">
                    <div className="cart">
                      <h4 className="title">Avg. Price</h4>
                      <p className="total-price"> £ {eventListing?.average ? eventListing?.average.toFixed(2): 0}</p>
                    </div>
                    <div className="cart">
                      <h4 className="title">Last. Hour</h4>
                      <p className="total-price"> £ 900</p>
                    </div>
                    <div className="cart">
                      <h4 className="title">Last 24 Hours</h4>
                      <p className="total-price"> £ 900</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <NotFound />
              </div>
            </div>
          </div>
        </>
      )}

      {opedPopUp && (
        <React.Fragment>
          <div className="event-sale-overlay" onClick={hanldeClose}></div>
          <div className="event-sale-listing">
            <div className="event-sale-detail">
              <div className="d-flex align-items-center my-2">
                <div className="col-6">
                  <h2 className="popup-title">Recent Sale</h2>
                </div>
                <div className="col-6 text-end">
                  <span className="closed-popup" onClick={hanldeClose}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <div id="style-1">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th> Event Name </th>
                      <th> Venue </th>
                      <th> Event Data </th>
                      <th> Price </th>
                      <th> Qauntity </th>
                      <th> Time Checked </th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryData?.recentSales.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td> name </td>
                          <td>venue </td>
                          <td> date </td>
                          <td> {e.Price} </td>
                          <td> {e.Quantity} </td>
                          <td> {e.time_checked} </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* <tfoot>
                    <tr>
                      <th> Date </th>
                      <th> Customer </th>
                      <th> Sales </th>
                      <th> Total </th>
                    </tr>
                  </tfoot> */}
                </table>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {evetnListingPop && (
        <React.Fragment>
          <div
            className="event-sale-overlay"
            onClick={hanldeEventListingPopUPClosed}
          ></div>
          <div className="event-sale-listing">
            <div className="event-sale-detail">
              <div className="d-flex align-items-center my-2">
                <div className="col-6">
                  <h2 className="popup-title">Event Listings</h2>
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

              <div id="style-1">
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
                          <td> £ 2391 </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* <tfoot>
                    <tr>
                      <th> Date </th>
                      <th> Customer </th>
                      <th> Sales </th>
                      <th> Total </th>
                    </tr>
                  </tfoot> */}
                </table>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default SearchResult;
