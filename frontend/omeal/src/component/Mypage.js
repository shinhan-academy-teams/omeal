import React from "react";
import CardImg from "../assets/img/card.png";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";

function Mypage(props) {
  return (
    <>
      <h1>마이페이지</h1>
      <div style={{ display: "flex" }}>
        <EggIcon
          sx={{
            display: "flex",
            marginBottom: 10,
            fontSize: 150,
            margin: "auto",
          }}
        ></EggIcon>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            width: 230,
            height: 250,
            backgroundColor: "#fef7ed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <h3>누구 구독중이다 새꺄</h3>
          <Button variant="contained">구독 정보</Button>
          <br></br>
          <Button variant="contained">배송 내역</Button>
          <br></br>
          <Button variant="contained">결제 내역</Button>
        </Box>
      </div>

      <h3>연결하신 카드 정보</h3>
      <img alt="" src={CardImg} width={"60%"}></img>
    </>
  );
}

export default Mypage;
