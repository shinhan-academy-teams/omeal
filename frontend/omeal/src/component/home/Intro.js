import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { MemberRoleState } from "recoil/SignInState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Intro(props) {
  const navi = useNavigate();
  const memberRoleState = useRecoilValue(MemberRoleState);
  useEffect(() => {
    if (memberRoleState === "ADMIN") {
      navi("/manage");
      return;
    }
  }, []);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/img/avatar-img/avatar1.png" />
        </ListItemAvatar>
        <ListItemText
          primary="6가지 입맛 성향"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary.light"
              >
                개인 맞춤형 메뉴를 배송해드려요!
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/img/avatar-img/avatar2.png" />
        </ListItemAvatar>
        <ListItemText
          primary="피드백을 남겨주세요"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary.light"
              >
                매일 남겨주시는 의견을 반영하여 메뉴를 구성해요!
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/img/avatar-img/avatar3.png" />
        </ListItemAvatar>
        <ListItemText
          primary="환경을 생각하는 ESG"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary.light"
              >
                다회용기 사용을 통해 ESG경영을 실천해요!
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

export default Intro;
