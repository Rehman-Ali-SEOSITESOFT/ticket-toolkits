import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import spotify from "../../assets/images/spotify.png";
import youtube from "../../assets/images/youtube.png";
import tiktok from "../../assets/images/tik-tok.png";
import SocialAccountDetail from "../../components/social";
import DatePicker from "react-multi-date-picker";
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
  const [sectionArr, setSectionArr] = useState([]);
  const [seatArr, setSeatArr] = useState([]);
  const [priceArr, setPriceArr] = useState([]);
  const [filterRow, setFilterRow] = useState("");
  const [filterSeat, setFilterSeat] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [filterStartPrice, setfilterStartPrice] = useState(0);
  const [filterEndPrice, setfilterEndPrice] = useState(0);
  const [filterDate, setFilterDate] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState([]);
  const [selectedDateValue, setSelectedDateValue] = useState([]);
  const [filterObjectArr, setFilterObjectArr] = useState([]);
  const [dateError, setDateError] = useState("");
  const [IsSeeAllSales, setIsSeeAllSales] = useState(false);
  const hanldeClose = (e) => {
    setOpedPopUp(false);
    setIsSeeAllSales(false);
    onClickReset(e);
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
  const [filterEventSaleGraphData, setFilterEventSaleGraphData] = useState([]);

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
    for (var s = 0; s < 500; s++) {
      let obj_s = {
        seat: s + 1,
      };
      seats.push(obj_s);
    }
    setSeatArr(seats);
    setPriceArr(seats);

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
            let sectionArr = [];
            let totalsales = [
              ...res.data.data.previousSales,
              ...res.data.data.recentSales,
            ];
            for (var s = 0; s < totalsales.length; s++) {
              let obj = {
                x:
                  totalsales[s].time_checked.split(" ")[0] +
                  " " +
                  totalsales[s].time_checked.split(" ")[1].split(":")[0] +
                  ":" +
                  totalsales[s].time_checked.split(" ")[1].split(":")[1],
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
                z: totalsales[s].Section,
              };
              // split date and make format that we used
              let date = totalsales[s].time_checked;
              let d = date.split(" ");
              let dateReverse = d[0].split("/").reverse().join("-");
              let objDate = {
                x: dateReverse + "T" + d[1],
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
              };
              let secObj = {
                sec: totalsales[s].Section,
              };
              sectionArr.push(secObj);
              grapArr.push(obj);
              lastHourArr.push(objDate);
            }
            setEventSaleGraphData(grapArr);

            setSectionArr(
              sectionArr.filter((obj, index) => {
                return index === sectionArr.findIndex((o) => obj.sec === o.sec);
              })
            );
            // Call the function to get the data from the last hour
            const lastHourData = findLastHourData(lastHourArr);
            const last24HourData = findLast24HourData(lastHourArr);
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
                    x: totalsales2[v]?.Section,
                    // x: totalsales2[v]["Event Date"],
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

  const handleKeyPressSearch = (event) => {
    if (event.key === "Enter") {
      // Handle the Enter key press here
      onClickSearch();
    }
  };

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
            let sectionArr = [];
            let totalsales = [
              ...res.data.data.previousSales,
              ...res.data.data.recentSales,
            ];
            for (var s = 0; s < totalsales.length; s++) {
              let obj = {
                x:
                  totalsales[s].time_checked.split(" ")[0] +
                  " " +
                  totalsales[s].time_checked.split(" ")[1].split(":")[0] +
                  ":" +
                  totalsales[s].time_checked.split(" ")[1].split(":")[1],
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
                z: totalsales[s].Section,
              };
              // split date and make format that we used
              let date = totalsales[s].time_checked;
              let d = date.split(" ");
              let dateReverse = d[0].split("/").reverse().join("-");

              let objDate = {
                x: dateReverse + "T" + d[1],
                y: parseInt(totalsales[s].Price.slice(1, 100).split(".")[0]),
              };
              let secObj = {
                sec: totalsales[s].Section,
              };
              sectionArr.push(secObj);
              grapArr.push(obj);
              lastHourArr.push(objDate);
            }
            setEventSaleGraphData(grapArr);
            setSectionArr(
              sectionArr.filter((obj, index) => {
                return index === sectionArr.findIndex((o) => obj.sec === o.sec);
              })
            );

            // Call the function to get the data from the last hour
            const lastHourData = findLastHourData(lastHourArr);
            const last24HourData = findLast24HourData(lastHourArr);
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
                    // x: totalsales2[v]["Event Date"],
                    x: totalsales2[v]?.Section,
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
    let remove_params = search_query.split('?');
    let queryLast = query?.split("?");
  
    axios
      .post(
        `${SERVER_URL}/api/liveSale/add-event`,
        { eventId: remove_params[0], query: queryLast[0] },
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
  const onClickReset = (e) => {
    e.preventDefault();
    setIsFilter(false);
    setFilterDate("");
    setFilterRow("");
    setFilterSeat("");
    setFilterSection("");
    setDateError("");
    setDateValue([]);
    setSelectedDateValue([]);
    setfilterStartPrice(0);
    setfilterEndPrice(0);
    setFilterEventSaleGraphData([]);
    setFilterObjectArr([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Handle the Enter key press here
      onFilter(event);
    }
  };

  const onFilter = (e) => {
    e.preventDefault();
    if (selectedDateValue.length === 1) {
      setDateError("Please make sure to select both the start and end dates.");
    } else if (
      (filterStartPrice === 0 && filterEndPrice !== 0) ||
      (filterStartPrice !== 0 && filterEndPrice === 0)
    ) {
      setDateError("Please make sure to select both the start and end price.");
    } else {
      setIsFilter(true);
      setDateError("");

      let allSales = [...queryData?.previousSales, ...queryData?.recentSales];
      let uArr = [];
      for (var t = 0; t < allSales.length; t++) {
        let date = allSales[t].time_checked;
        let d = date.split(" ");

        let dateReverse = d[0].split("/").reverse().join("-");

        let objDate = {
          ...allSales[t],
          time_checked: dateReverse,
        };
        uArr.push(objDate);
      }
      let filterArr = uArr.filter(
        (item) =>
          (parseInt(item.Price.slice(1, 100).split(".")[0]) >=
            parseInt(filterStartPrice) &&
            parseInt(item.Price.slice(1, 100).split(".")[0]) <=
              parseInt(filterEndPrice)) ||
          (item.Row.toLowerCase() !== "" &&
            item.Row.toLowerCase() === filterRow.toLowerCase()) ||
          (item.Seats !== "" && item.Seats.split(" ").includes(filterSeat)) ||
          item.Section === filterSection ||
          (new Date(item.time_checked) >= new Date(selectedDateValue[0]) &&
            new Date(item.time_checked) <= new Date(selectedDateValue[1]))
      );
      console.log(filterEndPrice, "filterEndPrice");
      console.log(filterStartPrice, "filterStartPrice");
      setFilterObjectArr(filterArr);
      let grapArr = [];
      for (let s = 0; s < filterArr.length; s++) {
        let obj = {
          x: filterArr[s].time_checked,
          y: parseInt(filterArr[s].Price.slice(1, 100).split(".")[0]),
          z: filterArr[s].Section,
        };
        grapArr.push(obj);
      }
      setFilterEventSaleGraphData(grapArr);
    }
  };

  const handleChangeDatePicker = (value) => {
    //your modification on passed value ....
    let arr = [];
    for (let d = 0; d < value.length; d++) {
      arr.push(
        value[d].year + "-" + value[d].month.number + "-" + value[d].day
      );
    }
    setDateValue(value);
    setSelectedDateValue(arr);

  };

  const onClickSeeAllSales = (e) => {
    e.preventDefault();
    setIsSeeAllSales(!IsSeeAllSales);
  };
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
                    onKeyDown={(e) => handleKeyPressSearch(e)}
                    onK
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
          <div className="container-xxl">
            <div className="row">
              <div className="col">
                <h2 className="sale-view-title">Event Viewer</h2>
              </div>
            </div>
            <div className="row align-items-center flex-wrap">
              <div className="col-lg-12 col-12">
                <div className="d-flex justify-content-between">
                  <div
                    style={error !== "" ? { outline: "1px solid red" } : null}
                    className="sale-view-search-input position-relative"
                  >
                    <input
                      type="text"
                      placeholder="Seach by viagogo link"
                      value={searchResult}
                      onChange={hanldeChangeInputResult}
                     onKeyDown={(e) => handleKeyPressSearch(e)}

                    />
                    <span className="sale-search-icon">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                  </div>
                  <button
                    className="search-button text-decoration-none"
                    onClick={() => onClickSearch()}
                  >
                    Search
                  </button>
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
                            queryData?.artist_image !== null &&
                            queryData?.artist_image !== undefined
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
                            queryData?.seatmap !== null &&
                            queryData?.seatmap !== undefined
                              ? queryData?.seatmap
                              : queryData?.seatmap_url !== null &&
                                queryData?.seatmap_url !== undefined
                              ? queryData?.seatmap_url
                              : NotFoundImage
                          }
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="output-cart-content">
                      <h2 className="title">
                        <a href={query} target="_blank">
                          {queryData?.event_name !== null
                            ? queryData?.event_name
                            : ""}
                        </a>
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
            <div className="row">
              <div className="col-lg-12  pt-4 m-auto col-12 ">
                <div className="filter-box-new">
                  {/* <input
                    type="text"
                    onKeyDown={(e) => handleKeyPress(e)}
                    hidden
                  /> */}
                  <div className="filter-by-wrapper d-flex justify-content-between align-items-center">
                    <h1 className="filter-by"> Filter by: </h1>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setFilterSection(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className="form-select"
                    >
                      <option
                        value={""}
                        selected={filterSection === "" ? true : false}
                      >
                        section
                      </option>
                      {sectionArr
                        .map((e) => e.sec.trim())
                        .sort((a, b) =>
                          a.localeCompare(b, undefined, { numeric: true })
                        )
                        .map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                    </select>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setFilterRow(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className="form-select"
                    >
                      <option
                        value=""
                        selected={filterRow === "" ? true : false}
                      >
                        row
                      </option>
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
                    <select
                      name=""
                      id=""
                      onChange={(e) => setFilterSeat(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className="form-select"
                    >
                      <option
                        value={""}
                        selected={filterSeat === "" ? true : false}
                      >
                        seat type
                      </option>
                      {seatArr.map((item, index) => (
                        <option value={item.seat} key={index}>
                          seat {item.seat}
                        </option>
                      ))}
                    </select>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setfilterStartPrice(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className={`form-select ${
                        dateError ===
                          "Please make sure to select both the start and end price." &&
                        "borr"
                      } `}
                    >
                      <option
                        value={0}
                        selected={filterStartPrice === 0 ? true : false}
                      >
                        start price
                      </option>
                      {priceArr.map((item, index) => (
                        <option value={item.seat} key={index}>
                          £ {item.seat}
                        </option>
                      ))}
                    </select>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setfilterEndPrice(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e)}
                      className={`form-select ${
                        dateError ===
                          "Please make sure to select both the start and end price." &&
                        "borr"
                      } `}
                    >
                      <option
                        value={0}
                        selected={filterEndPrice === 0 ? true : false}
                      >
                        end price
                      </option>
                      {priceArr.map((item, index) => (
                        <option value={item.seat} key={index}>
                          £ {item.seat}
                        </option>
                      ))}
                    </select>
                    <div
                      className={`date-picker ${
                        dateError ===
                          "Please make sure to select both the start and end dates." &&
                        "bor"
                      } `}
                    >
                      <DatePicker
                        placeholder="Start-Date ~ End-Date"
                        className="form-control error-date"
                        value={dateValue}
                        range
                        onChange={handleChangeDatePicker}
                      
                      />
                    </div>
                  </div>

                  <div className="btns-filter">
                    <button
                      onClick={(e) => onFilter(e)}
                      className="search-button text-decoration-none"
                    >
                      Filter
                    </button>
                    {isFilter && (
                      <button
                        onClick={(e) => onClickReset(e)}
                        className="search-button text-decoration-none"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                {dateError !== "" && (
                  <span className="text-danger selected-datte">
                    {dateError}
                  </span>
                )}
              </div>
            </div>
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
                    last updated:&nbsp;
                    {queryData?.last_checked
                      ? queryData?.last_checked.split(" ")[0] +
                        " " +
                        queryData?.last_checked.split(" ")[1].split(":")[0] +
                        ":" +
                        queryData?.last_checked.split(" ")[1].split(":")[1]
                      : "01:00"}
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
                      <ZAxis
                        dataKey="z"
                        type="number"
                        name="Section"
                        unit=""
                        tick={{ fill: "white" }}
                      />

                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Legend />

                      <Scatter
                        name="Event Sale"
                        data={
                          isFilter === false
                            ? eventSaleGraphData
                            : filterEventSaleGraphData
                        }
                        fill="#8884d8"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="enevt-cards-disc">
                  <button className="my-4 my-md-5" onClick={hanldeOpened}>
                    view all{" "}
                    {filterObjectArr.length > 0 ? "Filtered " : "recent "} 
                    Sales
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
                      &nbsp;listing (s) found
                    </p>
                  </div>
                  <h2 className="text-right time-right">
                    last updated:&nbsp;
                    {eventListing?.time_checked
                      ? eventListing.time_checked.split(" ")[0] +
                        " " +
                        eventListing.time_checked.split(" ")[1].split(":")[0] +
                        ":" +
                        eventListing.time_checked.split(" ")[1].split(":")[1]
                      : "01:10"}
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
                          name="Section"
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
                  <div className="d-flex justify-content-between flex-wrap">
                    <SocialAccountDetail
                      icon={facebook}
                      title="Followers"
                      value={
                        queryData?.facebook_followers
                          ? queryData?.facebook_followers
                          : 0
                      }
                    />
                    <SocialAccountDetail
                      icon={instagram}
                      title="Followers"
                      value={
                        queryData?.instagram_followers
                          ? queryData?.instagram_followers
                          : 0
                      }
                    />
                    <SocialAccountDetail
                      icon={spotify}
                      title="Listeners"
                      value={
                        queryData?.monthly_spotify_listeners
                          ? queryData?.monthly_spotify_listeners
                          : 0
                      }
                    />

                    <SocialAccountDetail
                      icon={youtube}
                      title="Listeners"
                      value={
                        queryData?.monthly_youTube_listeners
                          ? queryData?.monthly_youTube_listeners
                          : 0
                      }
                    />
                    <SocialAccountDetail
                      icon={tiktok}
                      title="Followers"
                      value={
                        queryData?.tiktok_followers
                          ? queryData?.tiktok_followers
                          : 0
                      }
                    />
                    <SocialAccountDetail
                      icon={youtube}
                      title="Followers"
                      value={
                        queryData?.youtube_followers
                          ? queryData?.youtube_followers
                          : 0
                      }
                    />
                  </div>
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
          <div
            className="event-sale-overlay"
            onClick={(e) => hanldeClose(e)}
          ></div>
          <div className="event-sale-listing">
            <div className="event-sale-detail">
              <div className="row my-2 pop-responsivechange">
                <div className="col-6">
                  <h2 className="popup-title">
                    {" "}
                    {IsSeeAllSales
                      ? "All Sales"
                      : filterObjectArr.length < 1
                      ? "Recent Sales"
                      : "Filtered Sales"}{" "}
                  </h2>
                </div>
                <div className="col-6 text-end">
                  <span
                    className="closed-popup"
                    onClick={(e) => hanldeClose(e)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>

              <div id="style-1">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th> Price </th>
                      <th> Quantity </th>
                      <th> Section </th>
                      <th> Row </th>
                      <th> Seats </th>
                      <th> Time Checked </th>
                    </tr>
                  </thead>
                  <tbody>
                    {IsSeeAllSales
                      ? [...queryData?.recentSales, ...queryData?.previousSales]
                          .sort(
                            (a, b) =>
                              new Date(
                                b.time_checked
                                  .split(" ")[0]
                                  .split("/")
                                  .reverse()
                                  .join("-")
                              ) -
                              new Date(
                                a.time_checked
                                  .split(" ")[0]
                                  .split("/")
                                  .reverse()
                                  .join("-")
                              )
                          )
                          .map((e, i) => {
                            return (
                              <tr key={i}>
                                <td> {e.Price} </td>
                                <td> {e.Quantity} </td>
                                <td> {e.Section} </td>
                                <td> {e.Row} </td>
                                <td> {e.Seats} </td>
                                <td> {e.time_checked} </td>
                              </tr>
                            );
                          })
                      : filterObjectArr.length < 1
                      ? queryData?.recentSales.map((e, i) => {
                          return (
                            <tr key={i}>
                              <td> {e.Price} </td>
                              <td> {e.Quantity} </td>
                              <td> {e.Section} </td>
                              <td> {e.Row} </td>
                              <td> {e.Seats} </td>
                              <td> {e.time_checked} </td>
                            </tr>
                          );
                        })
                      : filterObjectArr
                          ?.sort(
                            (a, b) =>
                              new Date(
                                b.time_checked
                                  .split(" ")[0]
                                  .split("/")
                                  .reverse()
                                  .join("-")
                              ) -
                              new Date(
                                a.time_checked
                                  .split(" ")[0]
                                  .split("/")
                                  .reverse()
                                  .join("-")
                              )
                          )
                          .map((e, i) => {
                            return (
                              <tr key={i}>
                                <td> {e.Price} </td>
                                <td> {e.Quantity} </td>
                                <td> {e.Section} </td>
                                <td> {e.Row} </td>
                                <td> {e.Seats} </td>
                                <td> {e.time_checked} </td>
                              </tr>
                            );
                          })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={(e) => onClickSeeAllSales(e)}
                    className="search-button text-decoration-none border-outline-none mt-2"
                  >
                    {IsSeeAllSales
                      ? filterObjectArr.length < 1
                        ? "Recent Sales"
                        : "Filtered Sales"
                      : "All Sales"}
                  </button>
                </div>
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
                      <th> Price </th>
                      <th> Quantity </th>
                      <th> Section </th>
                      <th> Row </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventListing?.recentSales.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.Price} </td>
                          <td>{e.Quantity} </td>
                          <td>{e.Section} </td>
                          <td>{e.Row} </td>
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
