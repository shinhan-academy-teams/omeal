import { Box, TextField } from "@mui/material";
import React from "react";

function ReceiveInfo(props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "450px" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="받는사람" variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="연락처" variant="outlined" />
    </Box>
  );
}

export default ReceiveInfo;
