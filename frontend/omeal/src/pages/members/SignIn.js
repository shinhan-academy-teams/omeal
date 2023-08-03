import { Paper } from "@mui/material";
import React from "react";
import SignInComp from "../../component/members/SignInComp";

function SignIn(props) {
  return (
    <>
      <Paper elevation={8} sx={{ margin: "16px 0", height: "95vh" }}>
        <SignInComp />
      </Paper>
    </>
  );
}

export default SignIn;
