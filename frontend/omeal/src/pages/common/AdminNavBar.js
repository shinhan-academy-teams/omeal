import React from "react";
import AdminHeader from "component/common/AdminHeader";
import { Outlet } from "react-router-dom";

function AdminNavBar(props) {
  return (
    <>
      <div className="App">
        <div className="wrapper">
          <AdminHeader />
          <div className="contentWrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNavBar;
