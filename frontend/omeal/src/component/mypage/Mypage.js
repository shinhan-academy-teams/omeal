import React, { useState } from "react";
import CardImg from "../../assets/img/card.png";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  ContinuousDaysState,
  MemberGradeState,
  MemberNickState,
  SubCheckState,
} from "../../recoil/SignInState";
import eggImg1 from "../../assets/img/egg1.png";
import eggImg2 from "../../assets/img/egg2.png";
import eggImg3 from "../../assets/img/egg3.png";
import eggImg4 from "../../assets/img/egg4.png";
import { List } from "reactstrap";
import Swal from "sweetalert2";

function Mypage(props) {
  //멤버 닉네임 & 구독 개월수
  const memberNick = useRecoilValue(MemberNickState);
  const memberGrade = useRecoilValue(MemberGradeState);
  const continuousDay = useRecoilValue(ContinuousDaysState);
  const sub = useRecoilValue(SubCheckState);
  const [elevation, setElevation] = useState(2);

  const navi = useNavigate();
  const userInfo = () => {
    navi("/user-info");
  };
  const subInfo = () => {
    if (!sub) {
      Swal.fire({
        icon: "warning",
        text: "구독중인 서비스가 없습니다.",
      });
      return;
    }
    navi("/mypage/sub-info");
  };
  const cardInfo = () => {
    navi("/mypage/card-info");
  };

  const DeliveryInfo = () => {
    navi("/mypage/delivery-info");
  };

  const PayInfo = () => {
    navi("/mypage/payment-info");
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {memberGrade === "날계란" ? (
            <img alt="" src={eggImg1} width={50}></img>
          ) : memberGrade === "반숙란" ? (
            <img alt="" src={eggImg2} width={50}></img>
          ) : memberGrade === "완숙란" ? (
            <img alt="" src={eggImg3} width={50}></img>
          ) : (
            <img alt="" src={eggImg4} width={50}></img>
          )}

          {continuousDay < 0 ? (
            <Typography>{memberNick}님 구독안하고있음</Typography>
          ) : (
            <Typography>
              <span style={{ color: "#FF7F3F" }}>{memberNick}</span>님{" "}
              {continuousDay}일 째 구독 중
            </Typography>
          )}
        </div>
        <List
          style={{ padding: 0, backgroundColor: "#FEF7ED" }}
          sx={{ width: "100%", bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          <ListItem alignItems="center">
            <ListItemButton onClick={subInfo}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/img/avatar-img/subinfo.png" />
              </ListItemAvatar>
              <ListItemText
                primary="구독정보"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary.light"
                    ></Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemButton onClick={DeliveryInfo}>
              <ListItemAvatar>
                <Avatar src="/img/avatar-img/delivery.png" />
              </ListItemAvatar>
              <ListItemText
                primary="배송내역"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary.light"
                    ></Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src="/img/avatar-img/payment.png" />
              </ListItemAvatar>
              <ListItemText
                primary="결제내역"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary.light"
                    ></Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      <h3>연결하신 카드 정보</h3>
      <img alt="" src={CardImg} width={"60%"} onClick={cardInfo}></img>
    </>
  );
}

export default Mypage;
