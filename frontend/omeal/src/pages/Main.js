import { Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { MemberGradeState, SignInState } from "../recoil/SignInState";

function Main(props) {
  // ★ 이렇게 가져다 쓰시면 됩니다
  const memberId = useRecoilValue(SignInState);
  const memberGrade = useRecoilValue(MemberGradeState);
  console.log("Recoil에서 가져온 아이디 " + memberId);
  console.log("Recoil에서 가져온 회원등급 " + memberGrade);
  return (
    <>
      <Typography variant="h1" gutterBottom>
        메인 홈 화면
      </Typography>
    </>
  );
}

export default Main;
