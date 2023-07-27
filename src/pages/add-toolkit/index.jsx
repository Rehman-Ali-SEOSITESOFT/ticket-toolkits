import React, { useState, useEffect } from "react";
import masjid from "../../assets/images/faisal-masjid.jpg";
import { Link, useNavigate } from "react-router-dom";
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
const AddToolkit = () => {
  const [searchResult, setSearchResult] = useState("");
  const [cards, setCarts] = useState([1, 2, 3, 4, 5, 1, 1, 1, 1, 2, 3]);
  const [opedPopUp, setOpedPopUp] = useState(false);
  const navigate = useNavigate();
  const hanldeClose = () => {
    setOpedPopUp(false);
    document.querySelector("body").style.overflow = "auto";
  };
  const hanldeOpened = () => {
    document.querySelector("body").style.overflow = "hidden";
    setOpedPopUp(true);
  };
  const hanldeChangeInputResult = (event) => {
    setSearchResult(event.target.value);
  };
  useEffect(() => {
    // let user = JSON.parse(localStorage.getItem("authUser"));
    let user = JSON.parse(Cookies.get("authUser"));
    if (user === null && user?.username === undefined) {
      navigate("/");
    }
  }, []);
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
