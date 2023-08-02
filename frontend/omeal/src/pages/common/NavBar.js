import React from "react";
import Header from "../../component/common/Header";
import Bottom from "../../component/common/Bottom";
import { Outlet } from "react-router-dom";

function NavBar(props) {
  return (
    <>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="contentWrapper">
            <Outlet />
          </div>
          <Bottom />
        </div>
      </div>
    </>
  );
}

export default NavBar;
