import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  ContinuousDaysState,
  SignInState,
  SubCheckState,
} from "../../recoil/SignInState";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SubInfo(props) {
  const navi = useNavigate();

  const [subInfo, setSubrInfo] = useState([]);
  const memberId = useRecoilValue(SignInState);
  const resetSubCheckState = useResetRecoilState(SubCheckState);
  const resetContinuousDaysState = useResetRecoilState(ContinuousDaysState);

  useEffect(() => {
    axios({
      method: "get",
      url: "/mypage/sub-info",
      params: { memId: memberId },
    })
      .then((res) => {
        setSubrInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memberId]);

  // 구독취소
  const cancelSubscription = () => {
    Swal.fire({
      title: "서비스를 해지하시겠습니까?",
      text: "회원 등급이 변동됩니다.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "구독 해지",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("/cancel-subscription", {
            params: { memId: memberId },
          })
          .then(function (response) {
            resetSubCheckState();
            resetContinuousDaysState();
            Swal.fire(
              "구독이 해지되었습니다.",
              "이용해주셔서 감사합니다.",
              "success"
            ).then(() => {
              navi("/");
            });
          })
          .catch(function (error) {});
      }
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "100%",
          height: "100%",
          backgroundColor: "#fef7ed",
          margin: "auto",
          color: "#ea5c2b",
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ margin: "30%" }}>
          <Typography
            variant="h5"
            className="backColor"
            sx={{ backgroundColor: "#fef7ed" }}
          >
            구독 정보
          </Typography>
          <TextField
            className="backColor"
            label="구독 종류"
            focused
            value={subInfo.subType}
            InputProps={{
              readOnly: true,
            }}
          />
          <br></br>
          <TextField
            className="backColor"
            label="배송 시간"
            focused
            value={subInfo.subTime}
            InputProps={{
              readOnly: true,
            }}
          />
          <br></br>
          <TextField
            className="backColor"
            label="식사 타입"
            focused
            value={subInfo.category}
            InputProps={{
              readOnly: true,
            }}
          />
          <br></br>
          <TextField
            className="backColor"
            label="용기 종류"
            focused
            value={subInfo.container}
            InputProps={{
              readOnly: true,
            }}
          />
          <br></br>
          <TextField
            className="backColor"
            label="알러지 음식"
            focused
            value={subInfo.memberAllergy}
            InputProps={{
              readOnly: true,
            }}
          />
          <br></br>
          <Button
            className="backColor"
            variant="contained"
            onClick={cancelSubscription}
          >
            구독 해지
          </Button>
        </div>
      </Box>
    </>
  );
}

export default SubInfo;
