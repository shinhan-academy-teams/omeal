import { Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { MemberGradeState, SignInState } from "../recoil/SignInState";

function Main(props) {
  const memberId = useRecoilValue(SignInState);
  const memberGrade = useRecoilValue(MemberGradeState);

  console.log("Recoil에서 잘 가져왔습니까? " + memberId, memberGrade);
  return (
    <>
      <Typography variant="h1" gutterBottom>
        메인 홈 화면
      </Typography>
      {memberId ? (
        <Typography variant="h5" gutterBottom>
          {memberId}의 등급은 {memberGrade}
        </Typography>
      ) : (
        ""
      )}
    </>
  );
}

export default Main;
