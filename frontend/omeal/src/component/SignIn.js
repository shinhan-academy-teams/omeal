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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { SignInState } from "../recoil/SignInState";

function SignIn(props) {
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const setLoggedInId = useSetRecoilState(SignInState);
  const navi = useNavigate();

  const handleId = (e) => {
    setMemberId(e.target.value);
  };
  const handlePwd = (e) => {
    setMemberPwd(e.target.value);
  };
  const signUp = () => {
    // navi("/pages/members/SignUp");
  };

  const signIn = () => {
    // 유효성 검사
    if (memberId === "" || undefined) {
      Swal.fire({
        icon: "error",
        text: "이메일을 입력해주세요",
      });
      return;
    } else if (memberPwd === "" || undefined) {
      Swal.fire({
        icon: "error",
        text: "비밀번호를 입력해주세요",
      });
      return;
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
        const result = res.data;
        console.log(result);

        if (result === "fail") {
          Swal.fire({
            icon: "error",
            text: "아이디와 비밀번호를 확인해주세요",
          });
        } else {
          setLoggedInId(memberId); // recoil로 아이디 저장
          // ★ 홈 화면으로 이동
        }
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
          type="password"
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
      <br></br>
      <Button onClick={signUp} variant="outlined">
        회원가입
      </Button>
    </>
  );
}

export default SignIn;
