import React , {useState}from "react";
import "./add-suggest.css"
import Cookies from "js-cookie";
const NotFound = () => {
   const [value, setValue] = useState("")
  const  sendMessage = () => {
    const user = JSON.parse(Cookies.get('authUser'))
    
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1134798748199948338/WWgXd7-dUrP1FHJuT9k_reWmBtYTDyUcxQuLwNDsidgxZvtoxPkVqVn2E1ZVdIja4uIR");

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      username: user.username,
      avatar_url: user.avatar,
      content: value
    }

    request.send(JSON.stringify(params));
  }
  const [evetnListingPop, setEvetnListingPop] = useState(false);
 
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
      <p className="text-center text-white d-block h2 mb-4 w-100">
        Add Your Suggestion
      </p>
      <button className="add-to-toolkit d-block" onClick={() => hanldeEventListingPopUPOpened()}> Add Suggestion</button>
     {evetnListingPop && (
        <React.Fragment>
          <div
            className="event-sale-overlay"
            onClick={hanldeEventListingPopUPClosed}
          ></div>
          <div className="event-sale-listing">
            <div className="event-sale-detail">
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

              <div id="style-1">
                  <textarea
                  className="text-are"
                  onChange={(e) => setValue(e.target.value)  }
                  /> 
                  <button onClick={() => sendMessage()} className="search-button text-decoration-none border-outline-none mt-2">Add Suggestion</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
      
  );
};

export default NotFound;
