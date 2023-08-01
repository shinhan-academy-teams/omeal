import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";

function Subscription(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [detailStep, setDetailStep] = useState(1);
  const steps = ["오밀플랜", "배송 정보", "결제"];
  const handleNext = () => {
    setDetailStep((preDetailStep) => preDetailStep + 1);
    if (detailStep === 4) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
    } else if (detailStep === 7) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
    } else if (detailStep === 8) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {(() => {
        switch (activeStep) {
          case 0:
            return <Notice progress={detailStep} total="4" step={activeStep} />;
          case 1:
            return (
              <Notice progress={detailStep - 4} total="3" step={activeStep} />
            );
          case 2:
            return (
              <Notice progress={detailStep - 7} total="1" step={activeStep} />
            );
          case 3:
            return <Complete />;
          default:
            return null;
        }
      })()}
      <Button variant="contained" onClick={handleNext}>
        다음
      </Button>
    </Box>
  );
}

function Notice(props) {
  const step = `${props.progress}/${props.total}`;
  const title = [
    {
      1: "배송 주기 선택",
      2: "식사 용기 선택",
      3: "음식 카테고리 선택",
      4: "음식 알러지 선택",
    },
    {
      1: "받는 분 정보를 입력하세요",
      2: "배송 정보를 입력하세요",
      3: "배송 옵션을 선택하세요",
    },
    {
      1: "결제 정보를 확인하세요",
    },
  ];
  const explain = [
    {
      1: "주간/월간 구독 서비스를 즐겨보세요.",
      2: "오밀을 즐기기 위해 안전한 포장 용기에 담아 보내드려요.",
      3: "원하는 음식을 선택해주세요.",
      4: "알러지 재료 음식은 미리 제외해드려요.",
    },
  ];
  return (
    <Box>
      <div className="title" style={{ display: "flex", alignItems: "center" }}>
        <Chip label={step} color="primary" />
        <h2>{title[props.step][props.progress]}</h2>
      </div>
      {props.step === 0 ? (
        <div className="explain">
          <p>{explain[0][props.progress]}</p>
        </div>
      ) : (
        <div></div>
      )}
    </Box>
  );
}

function Complete(props) {
  return <div>구독완료~~</div>;
}

export default Subscription;
