import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";

function CardInfo(props) {
  const [cardInfo, setCardInfo] = useState([]);
  const memberId = useRecoilValue(SignInState);

  const handleInputChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/mypage/card-info",
      params: { memId: memberId },
    })
      .then((res) => {
        setCardInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memberId]);

  const handleUpdate = (e) => {
    axios({
      method: "put",
      url: "/mypage/card-info",
      data: JSON.stringify({
        member: { memberId: memberId },
        serialNumber: cardInfo.serialNumber,
        cvc: cardInfo.cvc,
        expiryDate: cardInfo.expiryDate,
        cardPwd: cardInfo.cardPwd,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => {})
      .catch((err) => {
        console.log(err);
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
        <h1>카드정보수정</h1>
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
          className="backColor"
          id="outlined-required"
          label="카드번호"
          type="text"
          name="serialNumber"
          defaultValue=" "
          value={cardInfo.serialNumber}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-required"
          label="카드CVC"
          name="cvc"
          defaultValue=" "
          value={cardInfo.cvc}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-required"
          label="카드 유효기간"
          placeholder="MM/YY"
          type="text"
          name="expiryDate"
          defaultValue=" "
          value={cardInfo.expiryDate}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          className="backColor"
          id="outlined-password-input"
          label="카드 비밀번호"
          type="password"
          name="cardPwd"
          value={cardInfo.cardPwd}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <br></br>
      <Button variant="outlined" onClick={handleUpdate}>
        카드 정보 수정
      </Button>
    </>
  );
}

export default CardInfo;
