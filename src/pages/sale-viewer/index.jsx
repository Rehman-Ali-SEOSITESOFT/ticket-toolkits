import React, { useEffect, useState } from "react";
import "./sale-viewer.css";
import masjid from "../../assets/images/faisal-masjid.jpg";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../../components/not-found";

const SaleViewer = () => {
  const [searchResult, setSearchResult] = useState("");
  const [cards, setCarts] = useState([1, 2, 3, 4, 5, 1, 1, 1, 1, 2, 3]);
  const [cardStarted, setCardStarted] = useState(0);
  const [cardEnded, setCardEnded] = useState(5);
  const [error, setError] = useState("")
  const navigate = useNavigate();
   useEffect(()=>{
    let user= JSON.parse(localStorage.getItem('authUser'));
    if(user === null && user?.username  === undefined){
      navigate('/')
    }
   },[])


  const hanldeChangeInputResult = (event) => {
    if(event.target.value.length > 0 &&  (!event.target.value.includes('www.viagogo.co.uk') || !event.target.value.includes('E-'))){
      setError("Invalid vaigogo url. Please use valid one!")
     }else if (event.target.value.length == "0"){
      setError("")
     }else{
      setError("")
     }
    setSearchResult(event.target.value);
  };

  const hanlderShowMoreSales = () => {
    setCardEnded(cardEnded + 5);
  };
  const hanlderGoBacked = () => {
    setCardEnded(5);
    window.scrollTo(0, 0);
  };

  return (
    <section className="sale-viewer">
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            {/* <h2 className="sale-view-title">Sales Viewer</h2> */}
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-11 col-md-5 col-6">
            <div className="sale-view-search-input position-relative" style={error !== "" ? {outline: '1px solid red'}: null}>
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
            <Link
              to={`/search?query=${searchResult}`}
              className="search-button text-decoration-none"
            >
              Search
            </Link>
          </div>
          <p className="error-text">{error}</p>
        </div>
        <div className="row">
          <div className="col">
            {/* <div className="search-output-cards  mt-5 d-flex flex-wrap"> */}
            {/* <div className="output-card">
                <div className="output-cart-image">
                  <img src={masjid} alt="" className="img-fluid" />
                </div>
                <div className="output-cart-content">
                  <h2 className="title">
                    miami doplhins vs kansas city chiefs- nfl frankfurt games
                    2023 miami doplhins vs kansas city chiefs- nfl frankfurt
                    games 2023
                  </h2>
                  <address className="address">
                    deutsche bank park ( commerzbank arena) frankfurt, germany
                  </address>
                  <p className="weekname"> Sunday, 05 nov 2023 03:30 PM </p>
                </div> */}
            {/* </div> */}
            {/* {cards.slice(cardStarted, cardEnded).map((e, i) => {
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
              })} */}
            {/* </div> */}
            {/* <div className="show-more-sales">
              {cards.length <= cardEnded ? (
                <button onClick={hanlderGoBacked}>
                  No More Content Go Back
                </button>
              ) : (
                <button onClick={hanlderShowMoreSales}>Show More</button>
              )}
            </div> */}
          </div>
        </div>
      </div>

      {/*  HOT EVENT */}
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <div className="hot-events mt-5">
              <h4 className="title"> Trending Events 🔥</h4>
              <div className="d-flex flex-wrap hot-event-wrapper mt-4">
                {[1, 1, 1].map((e, i) => {
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
                          deutsche bank park ( commerzbank arena) frankfurt,
                          germany
                        </address>
                        <p className="weekname">
                          {" "}
                          Sunday, 05 nov 2023 03:30 PM{" "}
                        </p>
                      </div>
                    </div>
                  );
                })}
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

      {/*  GRAPHIC  */}
    </section>
  );
};

export default SaleViewer;
