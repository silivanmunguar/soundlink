import React, { useState } from "react";

import "./homepage.css";

function Homepage() {
  const [activePage, setActivePage] = useState("DISCOVER");

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="top-bar">
      <div
        className={`page-tile ${activePage === "SOCIAL" ? "active" : ""}`}
        onClick={() => handlePageClick("SOCIAL")}
      >
        SOCIAL
      </div>
      <div
        className={`page-tile ${activePage === "DISCOVER" ? "active" : ""}`}
        onClick={() => handlePageClick("DISCOVER")}
      >
        DISCOVER
      </div>
      <div
        className={`page-tile ${activePage === "SHARING" ? "active" : ""}`}
        onClick={() => handlePageClick("SHARING")}
      >
        SHARING
      </div>
    </div>
  );
}

const MemoizedHomepage = React.memo(Homepage);
export default MemoizedHomepage;
