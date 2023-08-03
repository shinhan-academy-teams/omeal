import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

function UserInfo(props) {
  const [userInfo, setUserInfo] = useState([]);

  const handleInputChange = (e) => {
    setUserInfo(e.target.value);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/auth/userInfo",
      params: { memId: "kky417@kakao.com" },
    })
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
          value={userInfo.memId}
          defaultValue=" "
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
          defaultValue=" "
          value={userInfo.memberNick}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="핸드폰번호"
          type="text"
          defaultValue=" "
          value={userInfo.memberTel}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="주소"
          type="text"
          defaultValue=" "
          value={userInfo.memberAddr}
          onChange={handleInputChange}
        />
      </Box>
      <br></br>
      <Button variant="outlined">회원 정보 수정</Button>
    </>
  );
}

export default UserInfo;
