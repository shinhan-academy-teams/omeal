import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MopedIcon from "@mui/icons-material/Moped";
import EggIcon from "@mui/icons-material/Egg";
import { useNavigate } from "react-router-dom";
import eggImg from "../../assets/img/egg2.png";
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
            icon={<HomeIcon />}
            onClick={main}
          />
          <BottomNavigationAction
            label="커뮤니티"
            icon={<Diversity3Icon />}
            onClick={omealland}
          />

          {memberGrade === "날계란" ? (
            <img alt="" src={eggImg1}></img>
          ) : memberGrade === "반숙란" ? (
            <img alt="" src={eggImg2}></img>
          ) : memberGrade === "완숙란" ? (
            <img alt="" src={eggImg3}></img>
          ) : (
            <img alt="" src={eggImg4}></img>
          )}

          <BottomNavigationAction
            label="오늘의 밀"
            icon={<MopedIcon />}
            onClick={todayMeal}
          />
          <BottomNavigationAction
            label="마이페이지"
            icon={<EggIcon />}
            onClick={myPage}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Bottom;
