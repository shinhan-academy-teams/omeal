import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import firecracker from "../../assets/firecracker.png";
import { useRecoilState, useRecoilValue } from "recoil";
import DeliveryCycle from "./subplan/DeliveryCycle";
import SelectContainer from "./subplan/SelectContainer";
import FoodCategory from "./subplan/FoodCategory";
import SelectAllergy from "./subplan/SelectAllergy";
import ReceiveInfo from "./subplan/ReceiveInfo";
import DeliveryInfo from "./subplan/DeliveryInfo";
import DeliveryTime from "./subplan/DeliveryTime";
import CheckPayment from "./subplan/CheckPayment";
import {
  AddrAtom,
  AllergyAtom,
  ContainerTypeAtom,
  DoorPwdAtom,
  FoodCategoryAtom,
  SubAddrAtom,
  SubTimeAtom,
  SubTypeAtom,
} from "../../recoil/SubscriptionState";
import axios from "axios";
import {
  ContinuousDaysState,
  SignInState,
  SubCheckState,
} from "../../recoil/SignInState";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function Subscription(props) {
  const navi = useNavigate();

  const [activeStep, setActiveStep] = useState(0); //스텝
  const [detailStep, setDetailStep] = useState(1); //페이지

  // 구독 정보 데이터
  const [subType] = useRecoilState(SubTypeAtom);
  const [containerType] = useRecoilState(ContainerTypeAtom);
  const [foodCategory] = useRecoilState(FoodCategoryAtom);
  const [Allergy] = useRecoilState(AllergyAtom);
  const [doorPwd] = useRecoilState(DoorPwdAtom);
  const [addr] = useRecoilState(AddrAtom);
  const [subAddr] = useRecoilState(SubAddrAtom);
  const [subTime] = useRecoilState(SubTimeAtom);
  const [continuousDay, setContinuousDay] = useRecoilState(ContinuousDaysState);
  const [SubCheck, setSubCheck] = useRecoilState(SubCheckState);

  // 회원 아이디
  const memberId = useRecoilValue(SignInState);
  const steps = ["오밀플랜", "배송 정보", "결제"];

  const handleNext = () => {
    // 1. DeliveryCycle에서 구독주기 선택 안했을 경우 => Alert
    if (detailStep === 1) {
      if (subType === "") {
        Swal.fire({
          icon: "warning",
          text: "주간, 월간 중 하나를 선택해주세요",
        });
        return detailStep === 1;
      }
    }

    // 3. FoodCategory에서 음식 선택 안했을 경우 => Alert
    if (detailStep === 3) {
      if (foodCategory === "") {
        Swal.fire({
          icon: "warning",
          text: "원하는 음식을 선택해주세요",
        });
        return detailStep === 3;
      }
    }

    // 6. DeliveryInfo에서 주소, 상세주소, (비밀번호) 입력 안했을 경우 => Alert
    if (detailStep === 6) {
      if (addr === "" || subAddr === "") {
        Swal.fire({
          icon: "warning",
          text: "주소와 상세 주소를 모두 입력해주세요",
        });
        return detailStep === 6;
      }
    }

    setDetailStep((preDetailStep) => preDetailStep + 1);
    if (detailStep === 4) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
    } else if (detailStep === 7) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
    } else if (detailStep === 8) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
      setContinuousDay("1");
      setSubCheck(true);

      const data = {
        memberId: memberId,
        subType: subType,
        container: containerType,
        category: foodCategory,
        deliveryAddr: addr + " " + subAddr,
        mealTime: subTime,
        memberAllergy: Allergy,
      };
      axios({
        method: "POST",
        url: "/subscribe",
        data: JSON.stringify(data),
        headers: { "Content-Type": `application/json` },
      })
        .then(function (response) {
          navi("/mypage/sub-info");
        })
        .catch(function (error) {});
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ margin: "40px" }}
      >
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

      {(() => {
        switch (detailStep) {
          case 1:
            return <DeliveryCycle />;
          case 2:
            return <SelectContainer />;
          case 3:
            return <FoodCategory />;
          case 4:
            return <SelectAllergy />;
          case 5:
            return <ReceiveInfo memberId={memberId} />;
          case 6:
            return <DeliveryInfo />;
          case 7:
            return <DeliveryTime />;
          case 8:
            return <CheckPayment />;
          default:
            return null;
        }
      })()}

      {detailStep < 8 ? (
        <Button variant="contained" onClick={handleNext}>
          다음
        </Button>
      ) : (
        detailStep === 8 && (
          <Button variant="contained" onClick={handleNext}>
            구독완료
          </Button>
        )
      )}
    </Box>
  );
}

function Notice(props) {
  const ment = {
    fontSize: "20px",
  };
  const step = `${props.progress}/${props.total}`;
  const title = [
    {
      1: "구독 주기 선택",
      2: "식사 용기 선택",
      3: "음식 카테고리 선택",
      4: "음식 알러지 선택",
    },
    {
      1: "받는 분 정보를 입력하세요",
      2: "배송 정보를 입력하세요",
      3: "배송 시간을 선택하세요",
    },
    {
      1: "결제 정보를 확인하세요",
    },
  ];
  const explain = [
    {
      1: "주간/월간 구독 서비스를 즐겨보세요.",
      2: "오밀을 즐기기 위해 안전한 포장 용기에 담아 보내드려요.",
      //3: "원하는 음식을 선택해주세요.",
      4: "알러지 재료 음식은 미리 제외해드려요.",
    },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <Box>
        <div
          className="title"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={1.5}>
              <Chip
                style={{ display: "flex", alignItems: "center" }}
                label={step}
                color="primary"
              />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h5" align="center" gutterBottom>
                {title[props.step][props.progress]}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={2.5}></Grid>
          </Grid>
        </div>
        {props.step === 0 ? (
          <div className="explain">
            <Typography variant="subtitle1" style={ment} gutterBottom>
              {explain[0][props.progress]}
            </Typography>
          </div>
        ) : (
          <div></div>
        )}
      </Box>
    </div>
  );
}

function Complete(props) {
  return (
    <div>
      <img
        src={firecracker}
        style={{ width: "80px", position: "absolute", top: "47%", left: "45%" }}
        alt="폭죽"
      />
      <Box
        sx={{
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          // width: 450,
          // height: 180,
          backgroundColor: "#FEF7ED",
          borderRadius: "20px",
          marginTop: "80px",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Typography
          variant="h6"
          style={{ color: "#FF7F3F", padding: "40px 0px 10px" }}
        >
          구독이 완료되었습니다!
        </Typography>
        <Typography variant="h6" style={{ color: "#FF7F3F" }}>
          당신의 오밀을 맛있게 요리 중입니다.
        </Typography>
        <Typography
          variant="h6"
          style={{ color: "#FF7F3F", padding: "10px 0px 25px" }}
        >
          다음주에 만나요:)
        </Typography>
      </Box>
    </div>
  );
}

export default Subscription;
