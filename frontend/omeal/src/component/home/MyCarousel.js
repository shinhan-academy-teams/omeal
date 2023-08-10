import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router";

function MyCarousel(props) {
  var items = [
    {
      name: "banner1",
      img: "/img/carousel-img/page1.png",
      button: "오늘의 밀 서비스 구독하기",
      url: "/subscription",
    },
    {
      name: "banner2",
      img: "/img/carousel-img/page2.png",
      button: "최애 음식 월드컵 하러가기",
      url: "/food-worldcup",
    },
  ];

  return (
    <Carousel sx={{ width: "100%", height: "100%" }}>
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
      <img
        src={props.item.img}
        alt={props.item.name}
        style={{ position: "relative" }}
      />
      <Button
        variant="contained"
        className="CheckButton"
        size="large"
        sx={{ position: "absolute", top: 425, left: 200 }}
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
