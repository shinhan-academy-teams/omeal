import React from "react";
import MyCarousel from "../component/home/MyCarousel";
import Intro from "../component/home/Intro";
import { MemberRoleState } from "recoil/SignInState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function Main(props) {
  const memberRoleState = useRecoilValue(MemberRoleState);
  const navi = useNavigate();

  useEffect(() => {
    if (memberRoleState === "ADMIN") {
      navi("/manage");
      return;
    }
  }, [memberRoleState]);

  return (
    <>
      <MyCarousel />
      <Box
        sx={{
          width: "95%",
          height: "35%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Intro />
      </Box>
    </>
  );
}

export default Main;
