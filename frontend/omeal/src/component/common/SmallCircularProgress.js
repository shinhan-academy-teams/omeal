import { CircularProgress, Typography } from "@mui/material";
import React from "react";

function SmallCircularProgress(props) {
  return (
    <>
      <CircularProgress />
      <Typography>Loading</Typography>
      <br></br>
    </>
  );
}

export default SmallCircularProgress;
