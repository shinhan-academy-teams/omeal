import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function SubInfo(props) {
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
        <h1>구독정보확인</h1>
        <TextField
          className="backColor"
          label="구독 종류"
          color="secondary"
          focused
          value="구독종류 여기다가 넣으셈"
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          className="backColor"
          label="식사 종류"
          color="secondary"
          focused
          value="식사종류 여기다가 넣으셈"
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          className="backColor"
          label="용기 종류"
          color="secondary"
          focused
          value="용기종류 여기다가 넣으셈"
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          className="backColor"
          label="알러지 음식"
          color="secondary"
          focused
          value="음식종류 여기다가 넣으셈"
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <br></br>
      <Button variant="outlined">구독 취소</Button>
    </>
  );
}

export default SubInfo;
