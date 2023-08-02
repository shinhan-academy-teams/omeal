import React from "react";
import SignUpComp from "../../component/members/SignUpComp";
import { Paper } from "@mui/material";

function SignUp(props) {
  return (
    <>
      <Paper elevation={8} sx={{ margin: "16px 0", height: "95vh" }}>
        <SignUpComp />
      </Paper>
    </>
  );
}

export default SignUp;
