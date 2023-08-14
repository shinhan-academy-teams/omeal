import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  ContinuousDaysState,
  MemberGradeState,
  MemberNameState,
  MemberNickState,
  MemberRoleState,
  SignInState,
  SubCheckState,
} from "../../recoil/SignInState";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import logoImg from "../../assets/img/logo/white_logo.png";

function AdminHeader(props) {
  const navi = useNavigate();

  const memberId = useRecoilValue(SignInState);
  const memberNick = useRecoilValue(MemberNickState);
  const resetSignInState = useResetRecoilState(SignInState);
  const resetMemberGradeState = useResetRecoilState(MemberGradeState);
  const resetMemberNameState = useResetRecoilState(MemberNameState);
  const resetMemberNickState = useResetRecoilState(MemberNickState);
  const resetContinuousDaysState = useResetRecoilState(ContinuousDaysState);
  const resetSubCheckState = useResetRecoilState(SubCheckState);
  const resetMemberRoleState = useResetRecoilState(MemberRoleState);

  const main = () => {
    navi("/manage");
  };

  const logout = () => {
    axios({
      method: "GET",
      url: "/auth/log-out",
    })
      .then((response) => {
        resetSignInState();
        resetMemberGradeState();
        resetMemberNameState();
        resetMemberNickState();
        resetContinuousDaysState();
        resetSubCheckState();
        resetMemberRoleState();
        navi("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="header" style={{ zIndex: "1" }}>
        <img
          alt="white logo"
          src={logoImg}
          style={{
            marginTop: "5px",
            height: "130%",
            float: "left",
            cursor: "pointer",
          }}
          onClick={main}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{
              pt: "3px",
              mr: 2,
              color: "#FEF7ED",
            }}
          >
            {memberNick} 님
          </Typography>
          <Button
            variant="outlined"
            disableElevation
            sx={{
              borderRadius: "20px",
              p: "3px 15px",
              mr: 1,
              color: "#EA5C2B",
              backgroundColor: "white",
              border: "2px solid #FEF7ED",
              ":hover": {
                color: "white",
                backgroundColor: "#EA5C2B",
                border: "2px solid #FEF7ED",
              },
            }}
            onClick={logout}
          >
            로그아웃
          </Button>
        </Box>
      </div>
    </>
  );
}

export default AdminHeader;
