import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function SignIn(props) {
  return (
    <>
      <h1>Sign Up</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-read-only-input" label="E-Mail" />
        <br></br>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="email"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          id="outlined-password-input"
          label="Password Confirm"
          type="password"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          id="outlined-password-input"
          label="닉네임"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          id="outlined-password-input"
          label="핸드폰번호"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          id="outlined-password-input"
          label="주소"
          type="text"
          autoComplete="current-password"
        />
      </Box>
    </>
  );
}

export default SignIn;
