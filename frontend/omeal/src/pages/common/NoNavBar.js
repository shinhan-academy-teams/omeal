import React from "react";
import { Outlet } from "react-router-dom";

function NoNavBar(props) {
  return (
    <>
      <div className="App">
        <div className="wrapper">
          <div className="contentWrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoNavBar;
