import React from "react";
import WorldcupComp from "../../component/worldcup/WorldcupComp";
import { Box } from "@mui/material";

function Worldcup(props) {
  return (
    <>
      <Box sx={{ width: "100%", height: "100%", background: "#FFF8E9" }}>
        <WorldcupComp />
      </Box>
    </>
  );
}

export default Worldcup;
