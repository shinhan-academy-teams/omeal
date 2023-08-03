import React from "react";
import CardImg from "../../assets/img/card.png";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Mypage(props) {
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
          <EggIcon
            sx={{
              marginBottom: 10,
              fontSize: 150,
              margin: "auto",
              cursor: "pointer",
            }}
            onClick={userInfo}
          ></EggIcon>
          <Box
            sx={{
              width: 230,
              height: 250,
              backgroundColor: "#fef7ed",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <h3>누구 구독중이다 새꺄</h3>
            <Button variant="contained" onClick={subInfo}>
              구독 정보
            </Button>
            <br></br>
            <Button variant="contained">배송 내역</Button>
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
