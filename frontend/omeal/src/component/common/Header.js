import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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

  const [memberGrade, setMemberGrade] = useRecoilState(MemberGradeState);
  const [memberNick, setMemberNick] = useRecoilState(MemberNickState);
  const [memberName, setMemberName] = useRecoilState(MemberNameState);
  const [continuousDaysState, setContinuousDaysState] = useRecoilState(ContinuousDaysState);
  const [subCheckState, setSubCheckState] = useRecoilState(SubCheckState);
  const [memberRoleState, setMemberRoleState] = useRecoilState(MemberRoleState);
  const [memberId, setMemberId] = useRecoilState(SignInState);
  const [state, setState] = useState({
    right: false,
  });

  const signIn = () => {
    navi("/auth/sign-in");
  };
  const isLogin = useRecoilValue(SignInState) === "" ? false : true;
  const isSub = subCheckState;

  const subscription = () => {
    if (isLogin) {
      if (isSub) {
        navi("/sub-info"); // 이미 구독중인 사용자가 구독신청을 누르면 → 마이페이지 구독정보로 이동
        return;
      }
      navi("/subscription");
    } else {
      navi("/auth/sign-in");
    }
  };
  const main = () => {
    navi("/");
  };

  const notice = () => {
    navi("/notice");
  };
  const faq = () => {
    navi("/faq");
  };
  const mypage = () => {
    navi("/mypage");
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

  const logout = () => {
    axios({
      method: "GET",
      url: "/auth/log-out",
    })
      .then((response) => {
        setMemberId("");
        setContinuousDaysState("");
        setMemberGrade("");
        setMemberName("");
        setMemberNick("");
        setMemberRoleState("");
        setSubCheckState("");
        navi("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding onClick={subscription}>
          <ListItemButton>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="구독신청" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CampaignIcon />
            </ListItemIcon>
            <ListItemText primary="공지사항" onClick={notice} />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="FAQ" onClick={faq} />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding onClick={logout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="로그아웃" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <div className="header" style={{ zIndex: "1" }}>
        <img
          alt="white logo"
          src={logoImg}
          style={{
            marginTop: "5px",
            height: "130%",
            float: "left",
            cursor: "pointer",
          }}
          onClick={main}
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
              onClick={mypage}
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
                  color: "white",
                  backgroundColor: "#EA5C2B",
                  border: "2px solid #FEF7ED",
                },
              }}
              onClick={signIn}
            >
              로그인
            </Button>
          )}

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
      </div>
    </>
  );
}

export default Header;
