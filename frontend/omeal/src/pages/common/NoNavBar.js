import React from "react";
import { Outlet } from "react-router-dom";

function NoNavBar(props) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default NoNavBar;
