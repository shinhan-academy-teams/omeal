import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import { useState } from "react";

function SubInfo(props) {
  const [subInfo, setSubrInfo] = useState([]);
  const memberId = useRecoilValue(SignInState);

  useEffect(() => {
    axios({
      method: "get",
      url: "/mypage/sub-info",
      params: { memId: memberId },
    })
      .then((res) => {
        setSubrInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memberId]);

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
        <h1>구독정보확인</h1>
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
      </Box>
      <br></br>
      <Button variant="outlined">구독 취소</Button>
    </>
  );
}

export default SubInfo;
