import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

function Card(props) {
  const [serialNumber, setSerialNumber] = useState(""); // 카드번호
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardPwd, setCardPwd] = useState("");

  // 카드번호 입력 함수
  const handleSerialNumber = (e) => {
    const rawNum = e.target.value.replace(/[^0-9]/g, "");
    const leng = rawNum.length;
    let formattedSN = "";

    if (leng < 5) {
      formattedSN = rawNum;
    } else if (leng < 9) {
      formattedSN = `${rawNum.slice(0, 4)}-${rawNum.slice(4)}`;
    } else if (rawNum.length < 13) {
      formattedSN = `${rawNum.slice(0, 4)}-${rawNum.slice(4, 8)}-${rawNum.slice(
        8
      )}`;
    } else if (rawNum.length < 17) {
      formattedSN = `${rawNum.slice(0, 4)}-${rawNum.slice(4, 8)}-${rawNum.slice(
        8,
        12
      )}-${rawNum.slice(12)}`;
    } else {
      formattedSN = `${rawNum.slice(0, 4)}-${rawNum.slice(4, 8)}-${rawNum.slice(
        8,
        12
      )}-${rawNum.slice(12, 16)}-${rawNum.slice(16)}}`;
    }
    const serialNumber = formattedSN.length > 0 ? formattedSN : "";
    setSerialNumber(serialNumber);
  };

  // 유효기간 / 추가 함수
  const handleExpiryDate = (e) => {
    const rawNum = e.target.value.replace(/[^0-9]/g, "");
    const leng = rawNum.length;
    let formattedSN = "";

    if (leng < 3) {
      formattedSN = rawNum;
    } else if (leng < 6) {
      formattedSN = `${rawNum.slice(0, 2)}/${rawNum.slice(2)}`;
    }
    const serialNumber = formattedSN.length > 0 ? formattedSN : "";
    setExpiryDate(serialNumber);
  };

  const handleCvc = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setCvc(numericValue);
  };

  const handleCardPwd = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setCardPwd(numericValue);
  };

  const reset = () => {
    setSerialNumber("");
    setExpiryDate("");
    setCvc("");
    setCardPwd("");
  };

  const signup = () => {
    //if 유효성 체크 (생략?)

    console.log("serialNumber : " + serialNumber);
    console.log("expiryDate : " + expiryDate);

    axios({
      url: `auth/sign-up`,
      method: "post",
      data: JSON.stringify({
        serialNumber: serialNumber,
        expiryDate: expiryDate,
        cvc: cvc,
        cardPwd: cardPwd, // Number(cardPwd) 하지 않은 이유 : 0이 생략된 채로 Back으로 넘어감;
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((res) => {
        console.log("axios 성공");
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
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
        <h1>카드 정보 입력</h1>
        <TextField
          className="backColor"
          id="outlined-disabled"
          label="카드사"
          type="text"
          defaultValue="신한카드"
          InputProps={{
            readOnly: true,
          }}
        />
        <br></br>
        <TextField
          name="serialNumber"
          value={serialNumber}
          onChange={handleSerialNumber}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 19,
          }}
          className="backColor"
          id="outlined-password-input"
          label="카드번호"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          name="cvc"
          value={cvc}
          onChange={handleCvc}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 3 }}
          className="backColor"
          id="outlined-password-input"
          label="카드CVC"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          name="expiryDate"
          value={expiryDate}
          onChange={handleExpiryDate}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 5 }}
          className="backColor"
          id="outlined-password-input"
          label="카드 유효기간"
          placeholder="MM/YY"
          type="text"
          autoComplete="current-password"
        />
        <br></br>
        <TextField
          name="cardPwd"
          value={cardPwd}
          onChange={handleCardPwd}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 4 }}
          className="backColor"
          id="outlined-password-input"
          label="카드 비밀번호"
          type="password"
          autoComplete="current-password"
        />
        <br></br>
        <br></br>
        <Button onClick={signup} variant="outlined">
          회원 가입 완료
        </Button>
      </Box>
    </>
  );
}

export default Card;
