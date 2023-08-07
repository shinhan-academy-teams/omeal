import {
  Box,
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
import noodleImg from "../../../src/assets/img/noodle.webp";
import bibimbapImg from "../../../src/assets/img/bibimbap.webp";
import saladImg from "../../../src/assets/img/salad.webp";
import sandwichImg from "../../../src/assets/img/sandwich.webp";

function TodayMealComp(props) {
  const navi = useNavigate();

  const memberId = useRecoilValue(SignInState);
  const memberName = useRecoilValue(MemberNameState);

  const steps = ["배송 준비중", "배송중", "배송 완료"];
  const [categoryNo, setCategoryNo] = useState("");

  // 멤버의 category에 맞게 이미지 나타나게 하기 위한 배열
  const categoryImg = [
    noodleImg,
    noodleImg,
    bibimbapImg,
    saladImg,
    sandwichImg,
    noodleImg,
  ];

  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    axios({
      url: "/today-meal/delivery-info",
      method: "get",
      params: { memberId: memberId },
    })
      .then((response) => {
        console.log(response.data);
        const result = response.data;
        const category = result.category;
        if (category === "애국자") {
          setCategoryNo(0);
        } else if (category === "국밥부장관") {
          setCategoryNo(1);
        } else if (category === "비빔대감") {
          setCategoryNo(2);
        } else if (category === "샐러디안") {
          setCategoryNo(3);
        } else if (category === "샌드위치백작") {
          setCategoryNo(4);
        } else if (category === "면장님") {
          setCategoryNo(5);
        }

        if (result.status === "배송준비중") {
          setActiveStep(0);
        } else if (result.status === "배송중") {
          setActiveStep(1);
        } else if (result.status === "배송완료") {
          setActiveStep(3);
        } else {
          setActiveStep(-1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        my={3}
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
          elevation={2}
          sx={{
            cursor: "pointer",
            width: "80%",
            aspectRatio: 1.7 / 1,
            borderRadius: "20px",
          }}
          onClick={() => {
            navi("/today-meal/feedback");
          }}
        >
          성향 마다 메뉴 개수가 다른데 어떻게 만들어야 할지 모르겠음
          <img alt="" src={categoryImg[categoryNo]} width={"60%"}></img>
        </Paper>
      </Tooltip>
    </>
  );
}

export default TodayMealComp;
