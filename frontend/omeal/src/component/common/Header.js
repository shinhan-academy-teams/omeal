import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  ContinuousDaysState,
  MemberGradeState,
  MemberNameState,
  MemberNickState,
  MemberRoleState,
  SignInState,
  SubCheckState,
} from "../../recoil/SignInState";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import logoImg from "../../assets/img/logo/white_logo.png";
import DehazeIcon from "@mui/icons-material/Dehaze";
import QuizIcon from "@mui/icons-material/Quiz";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function Header(props) {
  const navi = useNavigate();

  const memberId = useRecoilValue(SignInState);
  const memberNick = useRecoilValue(MemberNickState);
  const subCheckState = useRecoilValue(SubCheckState);

  const resetSignInState = useResetRecoilState(SignInState);
  const resetMemberGradeState = useResetRecoilState(MemberGradeState);
  const resetMemberNameState = useResetRecoilState(MemberNameState);
  const resetMemberNickState = useResetRecoilState(MemberNickState);
  const resetContinuousDaysState = useResetRecoilState(ContinuousDaysState);
  const resetSubCheckState = useResetRecoilState(SubCheckState);
  const resetMemberRoleState = useResetRecoilState(MemberRoleState);

  const [state, setState] = useState({
    right: false,
  });

  const isLogin = useRecoilValue(SignInState) === "" ? false : true;
  const isSub = subCheckState;

  const subscription = () => {
    if (isLogin) {
      if (isSub) {
        navi("/mypage/sub-info"); // 이미 구독중인 사용자가 구독신청을 누르면 → 마이페이지 구독정보로 이동
        return;
      }
      navi("/subscription");
    } else {
      navi("/auth/sign-in");
    }
  };

  const logout = () => {
    axios({
      method: "GET",
      url: "/auth/log-out",
    })
      .then((response) => {
        resetSignInState();
        resetMemberGradeState();
        resetMemberNameState();
        resetMemberNickState();
        resetContinuousDaysState();
        resetSubCheckState();
        resetMemberRoleState();
        navi("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box>
        <List>
          <ListItem disablePadding sx={{ py: 1 }} onClick={subscription}>
            <ListItemButton>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="구독신청" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ pb: 1 }}
            onClick={() => navi("/notice")}
          >
            <ListItemButton>
              <ListItemIcon>
                <CampaignIcon />
              </ListItemIcon>
              <ListItemText primary="공지사항" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ pb: 1 }} onClick={() => navi("/faq")}>
            <ListItemButton>
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </ListItem>
          {isLogin && (
            <ListItem disablePadding sx={{ pb: 1 }} onClick={logout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="로그아웃" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Divider />
      </Box>
      <Paper
        elevation={1}
        sx={{
          width: "80%",
          height: "max-content",
          m: "12px auto",
          p: 2,
          backgroundColor: "#eee",
          textAlign: "center",
        }}
      >
        <Typography variant="caption">© 2023 All Rights Reserved.</Typography>
        <br />
        <Typography
          variant="subtitle1"
          component="a"
          href="https://github.com/shinhan-academy-teams/omeal"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          omeal
        </Typography>
        <Box my={1}>
          <Divider />
        </Box>
        <Typography variant="subtitle1">We're Jomeal !</Typography>
        <Typography
          variant="caption"
          component="a"
          href="https://github.com/hee2425"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          임채희
        </Typography>
        <Typography variant="caption"> | </Typography>
        <Typography
          variant="caption"
          component="a"
          href="https://github.com/ehopaak"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          박성진
        </Typography>
        <Typography variant="caption"> | </Typography>
        <Typography
          variant="caption"
          component="a"
          href="https://github.com/djdjdddd"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          김용희
        </Typography>
        <br />
        <Typography
          variant="caption"
          component="a"
          href="https://github.com/Jennorresothie"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          윤성훈
        </Typography>
        <Typography variant="caption"> | </Typography>
        <Typography
          variant="caption"
          component="a"
          href="https://github.com/0seony"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          박영선
        </Typography>
        <Typography variant="caption"> | </Typography>
        <Typography
          variant="caption"
          component="a"
          href="https://github.com/KKangBro"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          김경윤
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <>
      <Box className="header" sx={{ zIndex: "1" }}>
        <img
          alt="logo"
          src={logoImg}
          style={{
            height: "80%",
            cursor: "pointer",
          }}
          onClick={() => navi("/")}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {memberId ? (
            <Typography
              variant="body1"
              sx={{
                pt: "3px",
                color: "#FEF7ED",
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
              }}
              onClick={() => navi("/mypage")}
            >
              {memberNick} 님
            </Typography>
          ) : (
            <Button
              variant="outlined"
              disableElevation
              sx={{
                borderRadius: "20px",
                p: "3px 15px",
                color: "#EA5C2B",
                backgroundColor: "white",
                border: "2px solid #FEF7ED",
                ":hover": {
                  color: "#FEF7ED",
                  backgroundColor: "#EA5C2B",
                  border: "2px solid #FEF7ED",
                },
              }}
              onClick={() => navi("/auth/sign-in")}
            >
              로그인
            </Button>
          )}

          {/* 햄버거 메뉴 */}
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <DehazeIcon
                sx={{ cursor: "pointer", ml: 3, mr: "12px", color: "white" }}
                onClick={toggleDrawer(anchor, true)}
              >
                {anchor}
              </DehazeIcon>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Header;
