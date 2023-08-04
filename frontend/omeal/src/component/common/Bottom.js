import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MopedIcon from "@mui/icons-material/Moped";
import EggIcon from "@mui/icons-material/Egg";
import { useNavigate } from "react-router-dom";

function Bottom(props) {
  const navi = useNavigate();

  const [value, setValue] = React.useState(0);

  const myPage = () => {
    navi("/mypage");
  };

  const todayMeal = () => {
    navi("/today-meal");
  };

  const main = () => {
    navi("/");
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          style={{ backgroundColor: "gray" }}
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
          <BottomNavigationAction label="커뮤니티" icon={<Diversity3Icon />} />

          <BottomNavigationAction
            icon={
              <EggIcon
                sx={{ display: "flex", marginBottom: 10, fontSize: 150 }}
              />
            }
          />

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
