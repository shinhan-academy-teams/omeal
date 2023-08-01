import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function UserInfo(props) {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: 450,
          height: 600,
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>회원정보</h1>
        <TextField
          className="backColor"
          id="outlined-disabled"
          label="E-Mail"
          type="text"
          defaultValue="이메일수정불가"
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="Password Confirm"
          type="password"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="닉네임"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="핸드폰번호"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="주소"
          type="text"
          autoComplete="current-password"
        />
      </Box>
      <br></br>
      <Button variant="outlined">회원 정보 수정</Button>
    </>
  );
}

export default UserInfo;
