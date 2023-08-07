import {
  Box,
  Divider,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MemberNameState, SignInState } from "../../recoil/SignInState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import menuImg from "../../assets/img/noodle_temp.png";

function TodayMealComp(props) {
  const navi = useNavigate();

  const memberId = useRecoilValue(SignInState);
  const memberName = useRecoilValue(MemberNameState);
  const [delivery, setDelivery] = useState({});
  const [elevation, setElevation] = useState(2);

  const steps = ["배송 준비중", "배송중", "배송 완료"];

  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    axios({
      url: "/today-meal/delivery-info",
      method: "get",
      params: { memberId: memberId },
    })
      .then((response) => {
        setDelivery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (delivery.status === "배송준비중") {
      setActiveStep(0);
    } else if (delivery.status === "배송중") {
      setActiveStep(1);
    } else if (delivery.status === "배송완료") {
      setActiveStep(3);
    } else {
      setActiveStep(-1);
    }
  }, [delivery]);

  return (
    <>
      <Box mt={4} sx={{ width: "80%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box
        my={5}
        sx={{
          width: "80%",
          backgroundColor: "#FEF7ED",
          borderRadius: "20px",
        }}
      >
        {activeStep === -1 ? (
          ""
        ) : activeStep === 0 || activeStep === 1 ? (
          <Typography variant="h6" py={3}>
            조금만 기다려주세요!
            <br />
            {memberName} 님의 식사가{" "}
            <span style={{ color: "#FF7F3F" }}>{steps[activeStep]}</span>입니다.
          </Typography>
        ) : (
          <>
            <Typography variant="h6" py={3}>
              식사가 <span style={{ color: "#FF7F3F" }}>{steps[2]}</span>
              되었습니다!
              <br />
              {memberName} 님, 맛있게 드세요 :)
            </Typography>
          </>
        )}
      </Box>
      <Tooltip title="피드백 남기기" arrow placement="top">
        <Paper
          elevation={elevation}
          onMouseEnter={() => setElevation(8)}
          onMouseLeave={() => setElevation(2)}
          sx={{
            cursor: "pointer",
            width: "80%",
            height: "auto",
            borderRadius: "20px",
          }}
          onClick={() => {
            navi("/today-meal/feedback", { state: delivery });
          }}
        >
          <Grid
            container
            spacing={2}
            p={2}
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={6}>
              <img
                alt="menu"
                src={menuImg}
                width="200px"
                style={{ borderRadius: "20px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Box py={3} px={2}>
                <Typography variant="h6">오늘의 밀</Typography>
                <Divider variant="middle" sx={{ borderBottomWidth: 3 }} />
                <Typography
                  variant="body1"
                  mt={3}
                  sx={{ letterSpacing: "0.2em" }}
                >
                  {delivery.menu}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Tooltip>
    </>
  );
}

export default TodayMealComp;
