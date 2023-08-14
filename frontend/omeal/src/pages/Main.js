import React from "react";
import MyCarousel from "../component/home/MyCarousel";
import Intro from "../component/home/Intro";
import { MemberRoleState } from "recoil/SignInState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <Intro />
    </>
  );
}

export default Main;
