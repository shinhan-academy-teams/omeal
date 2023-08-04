import React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { MemberGradeState, SignInState } from "../../recoil/SignInState";
import { Grid, Typography } from "@mui/material";

function SignInComp(props) {
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const setLoggedInId = useSetRecoilState(SignInState);
  const setMemberGrade = useSetRecoilState(MemberGradeState);
  const navi = useNavigate();

  const handleId = (e) => {
    setMemberId(e.target.value);
  };
  const handlePwd = (e) => {
    setMemberPwd(e.target.value);
  };
  const signUp = () => {
    navi("/auth/sign-up");
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
      url: "sign-in",
      method: "POST",
      data: JSON.stringify({
        memberId: memberId,
        memberPwd: memberPwd,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((res) => {
        const result = res.data;
        // console.log("result : " + result.memberGrade);

        if (result === "") {
          // 로그인 실패시 Back에서 null 보내게끔 했고, Front에선 ""로 인식하더라고
          Swal.fire({
            icon: "error",
            text: "아이디와 비밀번호를 확인해주세요",
          });
        } else {
          setLoggedInId(result.memberId); // recoil로 아이디 저장
          setMemberGrade(result.memberGrade); // recoil로 회원등급 저장
          navi("/"); // 홈 화면으로 이동
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#FEF7ED",
        }}
      >
        <Typography variant="h4" component="h4">
          SIGN IN
        </Typography>
        <Grid container spacing={4} my={2} sx={{ width: "60%" }}>
          <Grid item xs={12}>
            <TextField
              label="E-Mail"
              fullWidth
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              id="memberId"
              name="memberId"
              value={memberId}
              onChange={handleId}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              id="memberPwd"
              name="memberPwd"
              value={memberPwd}
              onChange={handlePwd}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={signIn} variant="outlined" sx={{ width: "30%" }}>
              로그인
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={signUp} variant="text" sx={{ width: "30%" }}>
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignInComp;
