import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SubInfo(props) {
  const [subInfo, setSubrInfo] = useState([]);
  const memberId = useRecoilValue(SignInState);
  const navi = useNavigate();

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
            console.log(response.data);
          })
          .catch(function (error) {});
        Swal.fire(
          "구독이 해지되었습니다.",
          "이용해주셔서 감사합니다.",
          "success"
        );
        navi("/");
      }
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: 450,
          height: 600,
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" className="backColor" color="secondary">
          구독 정보
        </Typography>
        <TextField
          className="backColor"
          label="구독 종류"
          color="secondary"
          focused
          value={subInfo.subType}
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          className="backColor"
          label="식사 종류"
          color="secondary"
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
          color="secondary"
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
          color="secondary"
          focused
          value={subInfo.memberAllergy}
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <Button
          className="backColor"
          color="secondary"
          variant="contained"
          onClick={cancelSubscription}
        >
          구독 해지
        </Button>
      </Box>
    </>
  );
}

export default SubInfo;
