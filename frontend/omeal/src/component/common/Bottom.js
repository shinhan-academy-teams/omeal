import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MopedIcon from "@mui/icons-material/Moped";
import EggIcon from "@mui/icons-material/Egg";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MemberGradeState } from "../../recoil/SignInState";
import eggImg1 from "../../assets/img/egg1.png";
import eggImg2 from "../../assets/img/egg2.png";
import eggImg3 from "../../assets/img/egg3.png";
import eggImg4 from "../../assets/img/egg4.png";

function Bottom(props) {
  const navi = useNavigate();
  const [value, setValue] = React.useState(0);
  const memberGrade = useRecoilValue(MemberGradeState);

  const location = useLocation();
  //현재 경로 알아내기
  const currentPath = location.pathname;

  console.log(currentPath);

  const eggImgs = {
    날계란: eggImg1,
    반숙란: eggImg2,
    완숙란: eggImg3,
    훈제란: eggImg4,
  };

  const myPage = () => {
    navi("/mypage");
  };

  const todayMeal = () => {
    navi("/today-meal");
  };

  const main = () => {
    navi("/");
  };

  const omealland = () => {
    navi("/omealland");
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          style={{ backgroundColor: "#ea5c2b" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="홈"
            id="home"
            icon={<HomeIcon />}
            onClick={main}
          />
          <BottomNavigationAction
            label="커뮤니티"
            id="community"
            icon={<Diversity3Icon />}
            onClick={omealland}
          />
          <BottomNavigationAction
            disabled
            label=""
            icon={
              <img
                alt="egg grade"
                width="48px"
                src={memberGrade ? eggImgs[memberGrade] : eggImgs["날계란"]}
              />
            }
          />
          <BottomNavigationAction
            label="오늘의 밀"
            id="omeal"
            icon={<MopedIcon />}
            onClick={todayMeal}
          />
          <BottomNavigationAction
            label="마이페이지"
            id="mypage"
            icon={<EggIcon />}
            onClick={myPage}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Bottom;
