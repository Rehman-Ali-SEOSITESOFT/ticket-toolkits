import React, { useState } from "react";
import "./sale-viewer.css";

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleViewer;
