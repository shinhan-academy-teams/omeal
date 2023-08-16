import React from "react";
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
import {
  ContinuousDaysState,
  MemberGradeState,
  MemberNameState,
  MemberNickState,
  SignInState,
  SubCheckState,
  MemberRoleState,
} from "../../recoil/SignInState";
import { Grid, Typography } from "@mui/material";

function SignInComp(props) {
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const setLoggedInId = useSetRecoilState(SignInState);
  const setMemberGrade = useSetRecoilState(MemberGradeState);
  const setMemberNick = useSetRecoilState(MemberNickState);
  const setMemberName = useSetRecoilState(MemberNameState);
  const setContinuousDaysState = useSetRecoilState(ContinuousDaysState);
  const setSubCheckState = useSetRecoilState(SubCheckState);
  const setMemberRoleState = useSetRecoilState(MemberRoleState);
  const navi = useNavigate();

  const handleId = (e) => {
    setMemberId(e.target.value);
  };

  const handlePwd = (e) => {
    setMemberPwd(e.target.value);
  };

  const handlePwdEnter = (e) => {
    if (e.keyCode === 13) {
      signIn();
    }
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

        if (result === "") {
          // 로그인 실패시 Back에서 null 보내게끔 했고, Front에선 ""로 인식하더라고
          Swal.fire({
            icon: "error",
            text: "아이디와 비밀번호를 확인해주세요",
          });
        } else {
          setLoggedInId(result.memberId); // recoil로 아이디 저장
          setMemberGrade(result.memberGrade); // recoil로 회원등급 저장
          setMemberNick(result.memberNick);
          setMemberName(result.memberName);
          setContinuousDaysState(result.continuousDays);
          setSubCheckState(result.sub);
          setMemberRoleState(result.memberRole);
          navi("/"); // 홈 화면으로 이동
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Typography variant="h5"> SIGN IN </Typography>
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
            onKeyUp={handlePwdEnter}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="button"
            variant="outlined"
            sx={{ width: "40%", lineHeight: "27px" }}
            onClick={signIn}
          >
            로그인
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="button"
            variant="text"
            sx={{ width: "40%", lineHeight: "27px" }}
            onClick={() => navi("/auth/sign-up")}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SignInComp;
