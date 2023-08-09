import React from "react";
import CardImg from "../../assets/img/card.png";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  ContinuousDaysState,
  MemberGradeState,
  MemberNickState,
} from "../../recoil/SignInState";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import FlightIcon from "@mui/icons-material/Flight";

function Mypage(props) {
  //멤버 닉네임 & 구독 개월수
  const memberNick = useRecoilValue(MemberNickState);
  const memberGrade = useRecoilValue(MemberGradeState);
  const continuousDay = useRecoilValue(ContinuousDaysState);

  console.log(memberGrade);

  const navi = useNavigate();
  const userInfo = () => {
    navi("/user-info");
  };
  const subInfo = () => {
    navi("/sub-info");
  };
  const cardInfo = () => {
    navi("/card-info");
  };

  const DeliveryInfo = () => {
    navi("/delivery-info");
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: 450,
          height: 600,
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex" }}>
          {memberGrade === "날계란" ? (
            <EggIcon
              sx={{
                marginBottom: 10,
                fontSize: 150,
                margin: "auto",
                cursor: "pointer",
              }}
              onClick={userInfo}
            ></EggIcon>
          ) : memberGrade === "반숙란" ? (
            <FlutterDashIcon
              sx={{
                marginBottom: 10,
                fontSize: 150,
                margin: "auto",
                cursor: "pointer",
              }}
              onClick={userInfo}
            ></FlutterDashIcon>
          ) : memberGrade === "완숙란" ? (
            <FlipCameraIosIcon
              sx={{
                marginBottom: 10,
                fontSize: 150,
                margin: "auto",
                cursor: "pointer",
              }}
              onClick={userInfo}
            ></FlipCameraIosIcon>
          ) : (
            <FlightIcon
              sx={{
                marginBottom: 10,
                fontSize: 150,
                margin: "auto",
                cursor: "pointer",
              }}
              onClick={userInfo}
            ></FlightIcon>
          )}

          <Box
            sx={{
              width: 270,
              height: 250,
              backgroundColor: "#fef7ed",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            {continuousDay < 0 ? (
              <h3>{memberNick}님 구독안하고있음</h3>
            ) : (
              <h3>
                {memberNick}님 {continuousDay}일 째 구독 중
              </h3>
            )}

            <Button variant="contained" onClick={subInfo}>
              구독 정보
            </Button>
            <br></br>
            <Button variant="contained" onClick={DeliveryInfo}>
              배송 내역
            </Button>
            <br></br>
            <Button variant="contained">결제 내역</Button>
          </Box>
        </div>
        <h3>연결하신 카드 정보</h3>
        <img alt="" src={CardImg} width={"60%"} onClick={cardInfo}></img>
      </Box>
    </>
  );
}

export default Mypage;
