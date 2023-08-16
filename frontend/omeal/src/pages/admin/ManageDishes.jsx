import FeedbackList from "component/admin/FeedbackList";
import React from "react";

function ManageDishes(props) {
  return (
    <div style={{ overflowY: "auto", width: "100%", height: "100%" }}>
      <FeedbackList />
    </div>
  );
}

export default ManageDishes;
