import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { SignInState } from "recoil/SignInState";

function MyCarousel(props) {
  const isLogin = useRecoilValue(SignInState) === "" ? false : true;

  var items = [
    {
      name: "banner1",
      img: "/img/carousel-img/page1.png",
      button: "오늘의 밀 서비스 구독하기",
      url: isLogin ? "/subscription" : "/auth/sign-in",
    },
    {
      name: "banner2",
      img: "/img/carousel-img/page2.png",
      button: "최애 음식 월드컵 하러가기",
      url: "/food-worldcup",
    },
  ];

  return (
    <Carousel sx={{ width: "100%", height: "530px" }}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const navi = useNavigate();

  return (
    <Paper elevation={0} sx={{ display: "flex", flexDirection: "column" }}>
      <img src={props.item.img} alt={props.item.name} />
      <Button
        variant="contained"
        className="CheckButton"
        size="large"
        sx={{ width: "300px", margin: "-75px auto 30px" }}
        onClick={() => {
          navi(props.item.url);
        }}
      >
        {props.item.button}
      </Button>
    </Paper>
  );
}

export default MyCarousel;
