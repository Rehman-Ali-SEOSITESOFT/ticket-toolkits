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
import AddSuggestion from "../../components/add-suggestion";
import axios from "axios";
import { SERVER_URL } from "../../components/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundImage from "../../assets/images/not-found.jpg";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import spotify from "../../assets/images/spotify.png";
import youtube from "../../assets/images/youtube.png";
import tiktok from "../../assets/images/tik-tok.png";
import SocialAccountDetail from "../../components/social";
const SearchResult = () => {
  const [searchResult, setSearchResult] = useState("");
  const search = useLocation().search;
  let query = new URLSearchParams(search).get("query");
  const [opedPopUp, setOpedPopUp] = useState(false);
  const [evetnListingPop, setEvetnListingPop] = useState(false);
  const [queryData, setQueryData] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [loader, setLoader] = useState(false);
  const [eventListing, setEventListing] = useState({});
  const [eventListingLoader, setEventListinLoader] = useState(false);
  const [lastHourSale, setlastHourSale] = useState([]);
  const [last24HourSale, setLast24HourSale] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [seatArr, setSeatArr] = useState([]);
  const [priceArr, setPriceArr] = useState([]);
  const [filterRow, setFilterRow] = useState("");
  const [filterSeat, setFilterSeat] = useState(0);
  const [filterPrice, setfilterPrice] = useState(0);
  const [filterDate, setFilterDate] = useState("");

  const navigate = useNavigate();

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
    setError("");
    setSearchResult(event.target.value);
  };

  const [eventSaleGraphData, setEventSaleGraphData] = useState([]);
  const [eventListingGraphData, setEventListingGraphData] = useState([]);

  // Function to find data from the last hour
  const findLastHourData = (dataArray) => {
    // Get the current date and time
    const currentTime = new Date();

    // Subtract one hour from the current date and time
    const lastHourTime = new Date(currentTime.getTime() - 60 * 60 * 1000);

    // Filter the array to include only objects with dates within the last hour
    const lastHourData = dataArray.filter(
      (item) => new Date(item.x) > new Date(lastHourTime)
    );

    return lastHourData;
  };

  // Function to find data from the last hour
  const findLast24HourData = (dataArray) => {
    // Get the current date and time
    const currentTime = new Date();
   
    // Subtract one hour from the current date and time
    const lastHourTime = new Date(currentTime.getTime() - 60 * 60 * 1000 * 24);

    // Filter the array to include only objects with dates within the last hour
    const lastHourData = dataArray.filter(
      (item) => new Date(item.x) > new Date(lastHourTime)
    );
  

    return lastHourData;
  };

  useEffect(() => {

    let user = {};
    if (Cookies.get("authUser") !== undefined) {
      user = JSON.parse(Cookies.get("authUser"));
      setToken(user.token);
    } else {
      user = null;
    }
    if (user === null && user?.username === undefined) {
      navigate("/");
    }
    let seats = [];
    for(var s = 0 ; s < 500; s++){
      let obj_s = {
         seat: s + 1
      }
      seats.push(obj_s)
    }
    setSeatArr(seats);
    setPriceArr(seats)

    if (query) {
      let q = query?.split("/");
      let search_query = q[q.length - 1].slice(2, 100);
      setLoader(true);

      const config = { headers: { "x-auth-token": user.token } };
      axios
        .get(
          `${SERVER_URL}/api/liveSale/search-event?query=${search_query}`,
          config
        )
        .then((res) => {
          if (res.data.success === 0) {
            setIsNotFound(true);
          } else {
            setQueryData(res.data.data);
            setIsNotFound(false);
            let grapArr = [];
            let lastHourArr = [];
            let totalsales = [
              ...res.data.data.previousSales,
              ...res.data.data.recentSales,
            ];
            for (var s = 0; s < totalsales.length; s++) {
              let obj = {
                x: totalsales[s].time_checked,
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
              };
              // split date and make format that we used
              let date = totalsales[s].time_checked;
              let d = date.split(" ");
              let dateReverse = d[0]
                .split("/")
                .sort((a, b) => b - a)
                .join("-");

              let objDate = {
                x: dateReverse + "T" + d[1],
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
              };
              grapArr.push(obj);
              lastHourArr.push(objDate);
            }
            setEventSaleGraphData(grapArr);
            // Call the function to get the data from the last hour
            const lastHourData = findLastHourData(lastHourArr);
            const last24HourData = findLast24HourData(lastHourArr);

            // let sum = 0;
            // let sum2 = 0;
            // for (var h = 0; h < lastHourData; h++) {
            //   sum += lastHourData[h].y;
            // }
            // for (var h1 = 0; h1 < last24HourData; h1++) {
            //   sum2 += last24HourData[h1].y;
            // }

            setLast24HourSale(last24HourData);
            setlastHourSale(lastHourData);

            // get event listing
            setEventListinLoader(true);
            axios
              .get(
                `${SERVER_URL}/api/listings/event-listing?query=${search_query}`,
                config
              )
              .then((res) => {
                setEventListing(res.data.data);

                let grap2Arr = [];
                let totalsales2 = [
                  // ...res.data.data.previousSales,
                  ...res.data.data.recentSales,
                ];

                for (var v = 0; v < totalsales2.length; v++) {
                  let obj2 = {
                    x: totalsales2[v]["Event Date"],
                    y: totalsales2[v]?.Price
                      ? parseInt(
                          totalsales2[v].Price.slice(1, 100).split(".")[0]
                        )
                      : 0,
                  };

                  grap2Arr.push(obj2);
                }

                setEventListingGraphData(grap2Arr);
                setEventListinLoader(false);
              })
              .catch((err) => {
                setEventListing({});
                setEventListinLoader(false);
              });
          }
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    } else {
      setIsNotFound(true);
    }
  }, []);

  const onClickSearch = () => {
    if (
      searchResult.length > 0 &&
      (!searchResult.includes("www.viagogo") || !searchResult.includes("E-"))
    ) {
      setError("Invalid Viagogo Url");
    } else if (searchResult.length == "0") {
      setError("Invalid Viagogo Url");
    } else {
      setError("");
      navigate(`/search?query=${searchResult}`);
      let q = searchResult.split("/");
      let search_query = q[q.length - 1].slice(2, 100);
      setLoader(true);

      const config = { headers: { "x-auth-token": token } };
      axios
        .get(
          `${SERVER_URL}/api/liveSale/search-event?query=${search_query}`,
          config
        )
        .then((res) => {
          if (res.data.success === 0) {
            setIsNotFound(true);
          } else {
            setQueryData(res.data.data);
            setIsNotFound(false);
            let grapArr = [];
            let lastHourArr = [];
            let totalsales = [
              ...res.data.data.previousSales,
              ...res.data.data.recentSales,
            ];
            for (var s = 0; s < totalsales.length; s++) {
              let obj = {
                x: totalsales[s].time_checked,
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
              };
              // split date and make format that we used
              let date = totalsales[s].time_checked;
              let d = date.split(" ");
              let dateReverse = d[0]
                .split("/")
                .sort((a, b) => b - a)
                .join("-");

              let objDate = {
                x: dateReverse + "T" + d[1],
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
              };
              grapArr.push(obj);
              lastHourArr.push(objDate);
            }
            setEventSaleGraphData(grapArr);
            // Call the function to get the data from the last hour
            const lastHourData = findLastHourData(lastHourArr);
            const last24HourData = findLast24HourData(lastHourArr);
            // let sum = 0;
            // let sum2 = 0;
            // for (var h = 0; h < lastHourData; h++) {
            //   sum += lastHourData[h].y;
            // }
            // for (var h1 = 0; h1 < last24HourData; h1++) {
            //   sum2 += last24HourData[h1].y;
            // }
            // setLast24HourSale(sum2);
            // setlastHourSale(sum);

            setLast24HourSale(last24HourData);
            setlastHourSale(lastHourData);

            // get event listing
            setEventListinLoader(true);
            axios
              .get(
                `${SERVER_URL}/api/listings/event-listing?query=${search_query}`,
                config
              )
              .then((res) => {
                setEventListing(res.data.data);

                let grap2Arr = [];
                let totalsales2 = [
                  // ...res.data.data.previousSales,
                  ...res.data.data.recentSales,
                ];

                for (var v = 0; v < totalsales2.length; v++) {
                  let obj2 = {
                    x: totalsales2[v]["Event Date"],
                    y: totalsales2[v]?.Price
                      ? parseInt(
                          totalsales2[v].Price.slice(1, 100).split(".")[0]
                        )
                      : 0,
                  };

                  grap2Arr.push(obj2);
                }

                setEventListingGraphData(grap2Arr);
                setEventListinLoader(false);
              })
              .catch((err) => {
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
    }
  };

  const onClickAddToToolkitBtn = () => {
    const config = { headers: { "x-auth-token": token } };
    let q = query?.split("/");
    let search_query = q[q.length - 1].slice(2, 100);
    axios
      .post(
        `${SERVER_URL}/api/liveSale/add-event`,
        { eventId: search_query, query: query },
        config
      )
      .then((res) => {
        if (res.data.success === 1) {
          toast(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "success",
          });
        } else {
          toast(res.data.message, {
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
      .catch((err) => console.log("search_query", err));
  };


  console.log(filterDate)
  console.log(filterPrice)
  console.log(filterSeat)
  console.log(filterRow)
 
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
                <div
                  style={error !== "" ? { outline: "1px solid red" } : null}
                  className="sale-view-search-input position-relative"
                >
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
            <p className="error-text">{error}</p>
          </div>
          <div className="container-xxl">
            <div className="row">
              <div className="col">
                <div className="not-found">
                  <p className="text-center text-white d-block h2 mb-4 w-100">
                    No Event found
                  </p>
                  <button
                    className="add-to-toolkit d-block"
                    onClick={() => onClickAddToToolkitBtn()}
                  >
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
            <div className="row align-items-center flex-wrap">
              <div className="col-lg-5 col-md-4 col-9">
                <div
                  style={error !== "" ? { outline: "1px solid red" } : null}
                  className="sale-view-search-input position-relative"
                >
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

              <div className="col-lg-1 col-md-2 col-3">
                <button
                  className="search-button text-decoration-none"
                  onClick={() => onClickSearch()}
                >
                  Search
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="filter-by-wrapper d-flex justify-content-between align-items-center">
                  <h1 className="filter-by"> Filter by: </h1>
                  <select name="" id="" onChange={(e) => setFilterRow(e.target.value)} className="form-select">
                    <option value="" disabled selected>row </option>
                    <option value="A">Row A</option>
                    <option value="B">Row B</option>
                    <option value="C">Row C</option>
                    <option value="D">Row D</option>
                    <option value="E">Row E</option>
                    <option value="F">Row F</option>
                    <option value="G">Row G</option>
                    <option value="H">Row H</option>
                    <option value="I">Row I</option>
                    <option value="J">Row J</option>
                    <option value="K">Row K</option>
                    <option value="L">Row L</option>
                    <option value="M">Row M</option>
                    <option value="N">Row N</option>
                    <option value="O">Row O</option>
                    <option value="P">Row P</option>
                    <option value="Q">Row Q</option>
                    <option value="R">Row R</option>
                    <option value="S">Row S</option>
                    <option value="T">Row T</option>
                    <option value="U">Row U</option>
                    <option value="V">Row V</option>
                    <option value="W">Row W</option>
                    <option value="X">Row X</option>
                    <option value="Y">Row Y</option>
                    <option value="Z">Row Z</option>
                  
                  </select>
                  <select name="" id="" onChange={(e) => setFilterSeat(e.target.value)} className="form-select">
                    <option value="" disabled selected >seat type </option>
                    {seatArr.map((item, index) => 
                    <option value={item.seat} key={index}>seat {item.seat}</option>
                      
                    )}
                    
                  </select>
                  <select name="" id="" onChange={(e) => setfilterPrice(e.target.value)} className="form-select">
                    <option value="" disabled selected>price </option>
                    {priceArr.map((item, index) => 
                    <option value={item.seat} key={index}> £ {item.seat}</option>
                      
                    )}
                  </select>

                  <input type="date" onChange={(e) => setFilterDate(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>
            <p className="error-text">{error}</p>
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
                        {queryData?.event_name !== null
                          ? queryData?.event_name
                          : ""}
                      </h2>
                      <address className="address">
                        {queryData?.event_title !== null
                          ? queryData?.event_title
                          : ""}
                      </address>
                      <p className="weekname">
                        {queryData?.event_date !== null
                          ? queryData?.event_date
                          : ""}
                      </p>
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
                      {queryData?.total_sales ? queryData?.total_sales : 0} Sale
                      (s) found
                    </p>
                  </div>
                  <h2 className="text-right time-right">
                    last updated:
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

                      <Scatter
                        name="Event Sale"
                        data={eventSaleGraphData}
                        fill="#8884d8"
                      />
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
                        £
                        {queryData?.average
                          ? queryData?.average?.toFixed(2)
                          : 0}
                      </p>
                    </div>
                    <div className="cart">
                      <h4 className="title">
                        Amount of Sales
                        <br />
                        (Last. Hour)
                      </h4>
                      <p className="total-price">{lastHourSale?.length}</p>
                    </div>
                    <div className="cart">
                      <h4 className="title">
                        Amount of Sales
                        <br />
                        (Last 24 Hours)
                      </h4>
                      <p className="total-price">{last24HourSale?.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-end mb-5 mt-md-0 mt-3">
                  <div>
                    <h2 className="heading">Event Listings</h2>
                    <p className="recordss">
                      {eventListing?.recentSales
                        ? [
                            ...eventListing?.recentSales,
                            ...eventListing?.previousSales,
                          ].length
                        : 0}
                      listing (s) found
                    </p>
                  </div>
                  <h2 className="text-right time-right">
                    last updated:
                    {eventListing?.time_checked
                      ? eventListing?.time_checked
                      : "01:10 PM"}
                  </h2>
                </div>
                <div className="event-listings-wrapper">
                  {eventListingLoader ? (
                    <h2 className="heading">Loading...</h2>
                  ) : (
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
                        <Scatter
                          name="Event Listing"
                          data={eventListingGraphData}
                          fill="#82ca9d"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="enevt-cards-disc">
                  <button
                    className="my-4 my-md-5"
                    onClick={hanldeEventListingPopUPOpened}
                  >
                    view all recent event listings
                  </button>
                  <div className="d-flex event-cardss flex-wrap">
                    <div className="cart">
                      <h4 className="title">Avg. Price</h4>
                      <p className="total-price">
                        £
                        {eventListing?.average
                          ? eventListing?.average.toFixed(2)
                          : 0}
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
            </div>
            <div className="row pt-5">
              <div className="col-lg-7 m-auto">
                <ul className="social-account-detail">
                  <div className="d-flex justify-content-between">
                    <SocialAccountDetail
                      icon={facebook}
                      title="Followers"
                      value={queryData?.facebook_followers ? queryData?.facebook_followers : 0 }
                    />
                    <SocialAccountDetail
                      icon={instagram}
                      title="Followers"
                      value={queryData?.instagram_followers ? queryData?.instagram_followers : 0}
                    />
                    <SocialAccountDetail
                      icon={spotify}
                      title="Listeners"
                      value={queryData?.monthly_spotify_listeners ? queryData?.monthly_spotify_listeners : 0}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <SocialAccountDetail
                      icon={youtube}
                      title="Listeners"
                      value={queryData?.monthly_youTube_listeners ? queryData?.monthly_youTube_listeners : 0}
                    />
                    <SocialAccountDetail
                      icon={tiktok}
                      title="Followers"
                      value={queryData?.tiktok_followers ? queryData?.tiktok_followers: 0}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Followers"
                      value={queryData?.youtube_followers ? queryData?.youtube_followers : 0}
                    />
                  </div>

                  {/* <div className="d-flex justify-content-between flex-wrap two-side">
                    <SocialAccountDetail
                      icon={facebook}
                      title="Followers"
                      value={`989.3k`}
                    />
                    <SocialAccountDetail
                      icon={instagram}
                      title="Followers"
                      value={`275k`}
                    />
                    <SocialAccountDetail
                      icon={spotify}
                      title="Listeners"
                      value={`181k`}
                    />
                    <SocialAccountDetail
                      icon={tiktok}
                      title="Followers"
                      value={0}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Listeners"
                      value={`844k`}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Followers"
                      value={`121k`}
                    />
                  </div> */}
                  {/* 
                  <h2 className="text-white fs-lg py-4 ">Version no 3</h2>
                  <div className="width-100">
                    <SocialAccountDetail
                      icon={facebook}
                      title="Followers"
                      value={`989.3k`}
                    />
                    <SocialAccountDetail
                      icon={instagram}
                      title="Followers"
                      value={`275k`}
                    />
                    <SocialAccountDetail
                      icon={spotify}
                      title="Listeners"
                      value={`181k`}
                    />
                    <SocialAccountDetail
                      icon={tiktok}
                      title="Followers"
                      value={0}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Listeners"
                      value={`844k`}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Followers"
                      value={`121k`}
                    />
                  </div>
                  <h2 className="text-white fs-lg py-4 ">Version no 4</h2>
                  <div className="d-flex justify-content-between">
                    <SocialAccountDetail
                      icon={facebook}
                      title="Followers"
                      value={`989.3k`}
                    />
                    <SocialAccountDetail
                      icon={instagram}
                      title="Followers"
                      value={`275k`}
                    />
                    <SocialAccountDetail
                      icon={spotify}
                      title="Listeners"
                      value={`181k`}
                    />
                  </div>
                  <div className="width-100">
                    <SocialAccountDetail
                      icon={tiktok}
                      title="Followers"
                      value={0}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Listeners"
                      value={`844k`}
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Followers"
                      value={`121k`}
                    />
                  </div> */}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <AddSuggestion />
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
              <div className="row my-2 pop-responsivechange">
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
                      {/* <th> Event Name </th>
                      <th> Venue </th>
                      <th> Event Date </th> */}
                      <th> Price </th>
                      <th> Quantity </th>
                      <th> Row </th>
                      <th> Seats </th>
                      <th> Section </th>
                      <th> Time Checked </th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryData?.recentSales.map((e, i) => {
                      return (
                        <tr key={i}>
                          {/* <td>{queryData?.event_name}</td>
                          <td>{queryData?.event_title}</td>
                          <td> {queryData?.event_date} </td> */}
                          <td> {e.Price} </td>
                          <td> {e.Quantity} </td>
                          <td> {e.Row} </td>
                          <td> {e.Seats} </td>
                          <td> {e.Section} </td>
                          <td> {e.time_checked} </td>
                        </tr>
                      );
                    })}
                  </tbody>
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
              <div className="row pop-responsivechange my-2">
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
                      {/* <th> Event Name </th>
                      <th> Venue Name </th>
                      <th> Event Date </th> */}
                      <th> Price </th>
                      <th> Quantity </th>
                      <th> Row </th>
                      <th> Section </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventListing?.recentSales.map((e, i) => {
                      return (
                        <tr key={i}>
                          {/* <td>{queryData?.event_name}</td>
                          <td>{queryData?.event_title}</td>
                          <td> {queryData?.event_date} </td> */}
                          <td>{e.Price} </td>
                          <td>{e.Quantity} </td>
                          <td>{e.Row} </td>
                          <td>{e.Section} </td>
                        </tr>
                      );
                    })}
                  </tbody>
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
