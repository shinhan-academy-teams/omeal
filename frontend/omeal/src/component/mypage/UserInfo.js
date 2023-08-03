import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";

function UserInfo(props) {
  const [userInfo, setUserInfo] = useState([]);
  const memberId = useRecoilValue(SignInState);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/mypage/user-info",
      params: { memId: memberId },
    })
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memberId]);

  const handleUpdate = (e) => {
    axios({
      method: "put",
      url: "/mypage/user-info",
      data: JSON.stringify({
        memberId: memberId,
        memberNick: userInfo.memberNick,
        memberPwd: userInfo.memberPwd,
        memberTel: userInfo.memberTel,
        memberAddr: userInfo.memberAddr,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => {})
      .catch((err) => {
        console.log(err);
      });
  };

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
          value={memberId}
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
          name="memberPwd"
          autoComplete="current-password"
          onChange={handleInputChange}
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
          id="outlined-required"
          label="닉네임"
          type="text"
          name="memberNick"
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
          name="memberTel"
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
          name="memberAddr"
          defaultValue=" "
          value={userInfo.memberAddr}
          onChange={handleInputChange}
        />
      </Box>
      <br></br>
      <Button variant="outlined" onClick={handleUpdate}>
        회원 정보 수정
      </Button>
    </>
  );
}

export default UserInfo;
