import React from "react";
import WorldcupComp from "../../component/worldcup/WorldcupComp";
import { Box, Typography } from "@mui/material";

function Worldcup(props) {
  return (
    <>
      <Typography variant="h4">최애 음식 월드컵</Typography>
      <Box p={3} mb={8}>
        <WorldcupComp />
      </Box>
    </>
  );
}

export default Worldcup;
