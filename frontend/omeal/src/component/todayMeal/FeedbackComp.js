import {
  Box,
  Grid,
  IconButton,
  Paper,
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
import { useRecoilState, useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from "axios";
import Swal from "sweetalert2";
import { FeedbackState } from "../../recoil/FeedbackState";

function FeedbackComp(props) {
  const navi = useNavigate();
  const { state } = useLocation();
  const memberId = useRecoilValue(SignInState);

  const [dislike, setDislike] = useState(false);
  const [like, setLike] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useRecoilState(FeedbackState);
  console.log("status : " + feedbackStatus);

  const Toast = Swal.mixin({
    toast: true,
    position: "center-center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // dislike 버튼 클릭
  const thumbDown = () => {
    setLike(false);
    if (dislike) {
      setDislike(false);
    } else {
      setDislike(true);
    }
  };

  // like 버튼 클릭
  const thumbUp = () => {
    setDislike(false);
    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
  };

  // 피드백 제출
  const submitFeedback = () => {
    if (dislike || like) {
      axios({
        url: "/today-meal/feedback",
        method: "post",
        data: JSON.stringify({
          deliveryNo: state.deliveryNo,
          memberId: memberId,
          menuName: state.menu,
          feedback: dislike ? "dislike" : "like",
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          setFeedbackStatus(res.data.feedbackStatus);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      Toast.fire({
        icon: "success",
        title: "소중한 피드백 감사합니다!",
      }).then(() => {
        navi("/today-meal");
      });
    }
  };

  return (
    <>
      <Box
        my={5}
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

      <Paper
        elevation={2}
        sx={{
          width: "80%",
          height: "auto",
          borderRadius: "20px",
        }}
      >
        <Grid
          container
          spacing={2}
          py={2}
          px={4}
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={9}>
            <Typography variant="body2" sx={{ letterSpacing: "0.2em" }}>
              {state.menu}
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Tooltip title="아쉬워요" arrow placement="top">
              <IconButton aria-label="thumbDown" onClick={thumbDown}>
                {dislike ? (
                  <ThumbDownAltIcon sx={{ color: "#FF7F3F" }} />
                ) : (
                  <ThumbDownOffAltIcon />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1.5}>
            <Tooltip title="맛있어요" arrow placement="top">
              <IconButton aria-label="thumbUp" onClick={thumbUp}>
                {like ? (
                  <ThumbUpAltIcon sx={{ color: "#FF7F3F" }} />
                ) : (
                  <ThumbUpOffAltIcon />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        spacing={2}
        width="80%"
        p={2}
        justify="flex-end"
        alignItems="center"
      >
        <Grid item xs>
          <TextField
            id="standard-multiline-static"
            multiline
            rows={2}
            variant="standard"
            fullWidth
            placeholder="기타 의견을 작성해주세요"
            sx={{ mt: 2 }}
          />
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="피드백 제출" arrow placement="top">
            <IconButton
              aria-label="submitFeedback"
              sx={{ mt: 2 }}
              onClick={submitFeedback}
            >
              <TaskAltIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default FeedbackComp;
