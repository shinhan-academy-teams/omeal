import { Box } from "@mui/material";
import React from "react";

function DeliveryInfo(props) {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "90%",
          height: 200,
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>배송내역보기</h1>
        날짜 배송테이블 데이터 끌어오기
      </Box>
    </>
  );
}

export default DeliveryInfo;
