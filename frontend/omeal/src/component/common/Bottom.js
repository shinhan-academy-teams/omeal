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
import {
  MemberGradeState,
  SignInState,
  SubCheckState,
} from "../../recoil/SignInState";
import eggImg1 from "../../assets/img/egg1.png";
import eggImg2 from "../../assets/img/egg2.png";
import eggImg3 from "../../assets/img/egg3.png";
import eggImg4 from "../../assets/img/egg4.png";
import Swal from "sweetalert2";
import { useEffect } from "react";

function Bottom(props) {
  const navi = useNavigate();
  const currentPath = useLocation().pathname;

  const isLogin = useRecoilValue(SignInState) === "" ? false : true;
  const memberGrade = useRecoilValue(MemberGradeState);
  const isSub = useRecoilValue(SubCheckState);
  const [value, setValue] = useState(currentPath);

  const eggImgs = {
    날계란: eggImg1,
    반숙란: eggImg2,
    완숙란: eggImg3,
    훈제란: eggImg4,
  };

  // url로 접근해도 하단탭이 작동되도록
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
    if (isLogin && newValue === "/today-meal" && !isSub) {
      // 구독하지 않은 회원이 오늘의밀 탭을 누르면
      Swal.fire({
        icon: "warning",
        title: "현재 구독 중이지 않습니다😭",
        html: `
          <div class="swal-my-custom">
            <a href="/subscription">오밀 구독하기</a>
          </div>
        `,
      });
      return;
    }

    setValue(newValue);
    navi(newValue);
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
            value="/"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="오밀랜드"
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
            value="/today-meal"
            icon={<MopedIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "white" }}
            label="마이페이지"
            value="/mypage"
            icon={<EggIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}

export default Bottom;
