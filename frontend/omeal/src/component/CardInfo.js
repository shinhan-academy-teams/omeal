import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function CardInfo(props) {
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
        <h1>카드정보수정</h1>
        <TextField
          className="backColor"
          id="outlined-disabled"
          label="카드사"
          type="text"
          defaultValue="신한카드"
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="카드번호"
          type="password"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="카드CVC"
          type="password"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="카드 유효기간"
          placeholder="MM/YY"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="카드 비밀번호"
          type="password"
          autoComplete="current-password"
        />
      </Box>
      <br></br>
      <Button variant="outlined">카드 정보 수정</Button>
    </>
  );
}

export default CardInfo;
