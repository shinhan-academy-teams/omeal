import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MopedIcon from "@mui/icons-material/Moped";
import EggIcon from "@mui/icons-material/Egg";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MemberGradeState, SubCheckState } from "../../recoil/SignInState";
import eggImg1 from "../../assets/img/egg1.png";
import eggImg2 from "../../assets/img/egg2.png";
import eggImg3 from "../../assets/img/egg3.png";
import eggImg4 from "../../assets/img/egg4.png";
import "./Bottom.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

function Bottom(props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navi = useNavigate();
  const [value, setValue] = useState(currentPath);
  const memberGrade = useRecoilValue(MemberGradeState);
  const sub = useRecoilValue(SubCheckState);

  useEffect(() => {
    let url = currentPath;
    const position = currentPath.indexOf("/", 1);
    if (position !== -1) {
      url = currentPath.substring(0, position);
    }
    if ((currentPath === url || currentPath.includes(url)) && value !== url) {
      setValue(url);
    }
  }, [currentPath, value]);

  const handleChange = (e, newValue) => {
    if (newValue === "/today-meal") {
      if (!sub) {
        Swal.fire({
          icon: "warning",
          text: "구독중인 서비스가 없습니다.",
        });
        return;
      }
    }

    setValue(newValue);
    navi(newValue);
  };

  const eggImgs = {
    날계란: eggImg1,
    반숙란: eggImg2,
    완숙란: eggImg3,
    훈제란: eggImg4,
  };

  return (
    <>
      <Box sx={{ width: "100%", zIndex: "1" }}>
        <BottomNavigation
          sx={{ backgroundColor: "#ea5c2b" }}
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="홈"
            id="home"
            value="/"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="오밀랜드"
            id="community"
            value="/omealland"
            icon={<Diversity3Icon />}
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
            sx={{ color: "white" }}
            label="오늘의밀"
            id="omeal"
            value="/today-meal"
            icon={<MopedIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="마이페이지"
            id="mypage"
            value="/mypage"
            icon={<EggIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}

export default Bottom;
