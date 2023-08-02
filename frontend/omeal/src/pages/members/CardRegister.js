import React from "react";
import CardComp from "../../component/members/CardComp";
import { Paper } from "@mui/material";

function CardRegister(props) {
  return (
    <>
      <Paper
        elevation={8}
        sx={{ margin: "16px 0", height: "95vh", width: "100%" }}
      >
        <CardComp />
      </Paper>
    </>
  );
}

export default CardRegister;