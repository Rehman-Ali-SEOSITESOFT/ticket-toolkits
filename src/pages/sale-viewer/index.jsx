import React, { useEffect, useState } from "react";
import "./sale-viewer.css";
import masjid from "../../assets/images/faisal-masjid.jpg";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/not-found";

const SaleViewer = () => {
  const [searchResult, setSearchResult] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
   useEffect(()=>{
    let user= JSON.parse(localStorage.getItem('authUser'));
    if(user === null && user?.username  === undefined){
      navigate('/')
    }
   },[])


  const hanldeChangeInputResult = (event) => {
    setSearchResult(event.target.value);
    setError("")
  };



  const onClickSearch = (e) =>{
    if(searchResult.length > 0 &&  (!searchResult.includes('www.viagogo.co.uk') || !searchResult.includes('E-'))){
      setError("Invalid viagogo url. Please use valid one!")
     }else if (searchResult.length == "0"){
      setError("Invalid viagogo url. Please use valid one!")
     }else{
      setError("")
      navigate(`/search?query=${searchResult}`)
     }
  }

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
            <button
             onClick={(e) => onClickSearch(e)}
             className="search-button text-decoration-none"
            >
              Search
            </button>
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
