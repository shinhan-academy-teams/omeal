import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";

function SignIn(props) {
  // 이메일(아이디)은 recoil 써서 가져와야겠다...가 아니고 여기서 로그인하면 recoil에 넣는 방식이 돼야겠네
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");

  const handleId = (e) => {
    setMemberId(e.target.value);
  };
  const handlePwd = (e) => {
    setMemberPwd(e.target.value);
  };

  console.log(memberPwd);

  const signIn = () => {
    // 유효성 검사
    if (memberId === "" || undefined) {
      console.log("아이디(이메일)를 입력해주세요");
    } else if (memberPwd === "" || undefined) {
      console.log("비밀번호를 입력해주세요");
    }

    axios({
      url: "auth/sign-in",
      method: "POST",
      data: JSON.stringify({
        memberId: memberId,
        memberPwd: memberPwd,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((res) => {
        console.log(res.data);
        console.log("axios 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Sign In</h1>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">E-Mail</InputLabel>
          <Input
            value={memberId}
            onChange={handleId}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <br></br>
        <TextField
          value={memberPwd}
          onChange={handlePwd}
          id="input-with-icon-textfield"
          label="PassWord"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Box>
      <Button onClick={signIn} variant="outlined">
        로그인
      </Button>
    </>
  );
}

export default SignIn;
