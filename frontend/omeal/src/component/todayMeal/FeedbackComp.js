import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

function FeedbackComp(props) {
  const { state } = useLocation();
  const navi = useNavigate();

  const memberId = useRecoilValue(SignInState);

  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [menus, setMenus] = useState([
    {
      menuName: state.menu.split("|")[0],
      feedback: null,
      feedbackContent: "",
    },
  ]);

  // 메뉴가 여러개 일때
  useEffect(() => {
    if (state.menu.includes("|")) {
      const secondMenu = {
        menuName: state.menu.split("|")[1],
        feedback: null,
        feedbackContent: "",
      };
      const copyMenus = [...menus];
      copyMenus.push(secondMenu);
      setMenus(copyMenus);
      setType(2);
    } else {
      setType(1);
    }
  }, []);

  // dislike 버튼 클릭
  const thumbDown = (idx) => {
    const copyMenus = [...menus];
    copyMenus[idx].feedback = "dislike";
    setMenus(copyMenus);
  };

  // like 버튼 클릭
  const thumbUp = (idx) => {
    const copyMenus = [...menus];
    copyMenus[idx].feedback = "like";
    setMenus(copyMenus);
  };

  // 기타 의견 작성
  const handleContent = (e) => {
    const copyMenus = [...menus];
    copyMenus.map((item) => (item.feedbackContent = e.target.value));
    setMenus(copyMenus);
  };

  // 피드백 읽어오기
  useEffect(() => {
    axios({
      url: "/today-meal/feedback",
      method: "post",
      data: JSON.stringify({
        memberId: memberId,
        menus: menus,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        const arr = res.data;
        const copyMenus = menus.map((item, idx) => {
          const copyItem = { ...item };
          copyItem.feedback = arr[idx]?.feedback;
          copyItem.feedbackContent = arr[idx]?.feedbackContent;
          return copyItem;
        });
        setMenus(copyMenus);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [type]);

  // 피드백 제출
  const submitFeedback = () => {
    if (menus[0].feedback || menus[1].feedback) {
      axios({
        url: "/today-meal/feedback",
        method: "put",
        data: JSON.stringify({
          memberId: memberId,
          menus: menus,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          Toast.fire({
            icon: "success",
            text: "소중한 피드백 감사합니다🫡",
          }).then(() => {
            navi("/today-meal");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "center-center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <>
      <Box
        my={8}
        sx={{
          width: "80%",
          backgroundColor: "#FEF7ED",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h6" py={3}>
          <span style={{ color: "#FF7F3F" }}>오늘의 밀은 어떠셨나요?</span>
          <br />
          피드백을 남겨주시면
          <br />
          다음 식사부터 반영하겠습니다
        </Typography>
      </Box>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "80%", height: "144px", borderRadius: "20px" }}
        />
      ) : (
        <Paper
          elevation={2}
          sx={{
            mt: 2,
            width: "80%",
            height: "auto",
            borderRadius: "20px",
          }}
        >
          <Box p={4}>
            {menus.map((item, idx) => (
              <Grid
                container
                spacing={2}
                py={2}
                justify="flex-end"
                alignItems="center"
                key={idx}
              >
                <Grid item xs={9}>
                  <Typography variant="body1" sx={{ letterSpacing: "0.2em" }}>
                    {item.menuName}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Tooltip title="아쉬워요" arrow placement="top">
                    <IconButton
                      aria-label="thumbDown"
                      onClick={() => thumbDown(idx)}
                    >
                      {item.feedback === "dislike" ? (
                        <ThumbDownAltIcon sx={{ color: "#FF7F3F" }} />
                      ) : (
                        <ThumbDownOffAltIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1.5}>
                  <Tooltip title="맛있어요" arrow placement="top">
                    <IconButton
                      aria-label="thumbUp"
                      onClick={() => thumbUp(idx)}
                    >
                      {item.feedback === "like" ? (
                        <ThumbUpAltIcon sx={{ color: "#FF7F3F" }} />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
            <Divider sx={{ mt: 3 }} />
            <Grid container spacing={2} justify="flex-end" alignItems="center">
              <Grid item xs>
                <TextField
                  id="standard-multiline-static"
                  multiline
                  rows={2}
                  variant="standard"
                  fullWidth
                  placeholder="기타 의견을 작성해주세요"
                  sx={{ mt: 2 }}
                  onChange={handleContent}
                  value={menus[0].feedbackContent}
                />
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="피드백 제출" arrow placement="top">
                  <Button
                    variant="outlined"
                    aria-label="submitFeedback"
                    sx={{ mt: "36px" }}
                    onClick={submitFeedback}
                  >
                    <SendIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default FeedbackComp;
