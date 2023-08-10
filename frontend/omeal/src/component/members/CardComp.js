import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CardComp(props) {
  const { state } = useLocation();
  const navi = useNavigate();

  const [buttonActive, setButtonActive] = useState(false);

  const [serialNumber, setSerialNumber] = useState(""); // 카드번호
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardPwd, setCardPwd] = useState("");

  // 모든 입력창이 입력됐는지
  useEffect(() => {
    if (serialNumber && expiryDate && cvc && cardPwd) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [serialNumber, expiryDate, cvc, cardPwd]);

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
    // if 유효성 체크 (생략?)

    axios({
      url: "sign-up",
      method: "post",
      data: JSON.stringify({
        member: state,
        serialNumber: serialNumber,
        expiryDate: expiryDate,
        cvc: cvc,
        cardPwd: cardPwd, // Number(cardPwd) 하지 않은 이유 : 0이 생략된 채로 Back으로 넘어감;
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((res) => {
        navi("/auth/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };

  return (
    <>
      <Typography variant="h5">CARD REGISTER</Typography>
      <Grid container spacing={2} my={2} sx={{ width: "60%" }}>
        <Grid item xs={12}>
          <TextField
            label="카드사"
            required
            fullWidth
            type="text"
            id="cardCompany"
            defaultValue="신한카드"
            inputProps={{
              readonly: "readonly",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="카드번호"
            required
            fullWidth
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 19,
            }}
            id="serialNumber"
            name="serialNumber"
            value={serialNumber}
            onChange={handleSerialNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="카드CVC"
            required
            fullWidth
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 3,
            }}
            id="cvc"
            name="cvc"
            value={cvc}
            onChange={handleCvc}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="카드 유효기간"
            required
            fullWidth
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 5,
            }}
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            placeholder="MM/YY"
            onChange={handleExpiryDate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="카드 비밀번호"
            required
            fullWidth
            id="cardPwd"
            name="cardPwd"
            value={cardPwd}
            type="password"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 4,
            }}
            onChange={handleCardPwd}
          />
        </Grid>
      </Grid>
      <Button
        sx={{ mt: 3 }}
        type="button"
        variant="outlined"
        onClick={signup}
        disabled={!buttonActive}
      >
        회원 가입
      </Button>
    </>
  );
}

export default CardComp;
