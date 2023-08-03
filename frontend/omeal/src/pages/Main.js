import { Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../recoil/SignInState";

function Main(props) {
  const memberId = useRecoilValue(SignInState);
  console.log("Recoil에서 잘 가져왔습니까? " + memberId);
  return (
    <>
      <Typography variant="h1" gutterBottom>
        메인 홈 화면
      </Typography>
    </>
  );
}

export default Main;
