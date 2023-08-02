import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Card(props) {
  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "#E0E3E7",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 4,
      padding: "4px !important", // override inline-style
    },
  });
  return (
    <>
      <h1>CARD</h1>
      <Box
        component="form"
        noValidate
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <ValidationTextField
          label="카드사"
          variant="outlined"
          defaultValue="신한카드"
          id="validation-outlined-input"
          InputProps={{
            readOnly: true,
          }}
        />

        <ValidationTextField
          label="카드번호"
          required
          variant="outlined"
          id="validation-outlined-input"
        />

        <ValidationTextField
          label="카드CVC"
          required
          variant="outlined"
          id="validation-outlined-input"
        />

        <ValidationTextField
          label="카드 유효기간"
          required
          variant="outlined"
          id="validation-outlined-input"
        />

        <ValidationTextField
          label="카드 비밀번호"
          required
          variant="outlined"
          id="validation-outlined-input"
        />
      </Box>
      <br></br>
      <Button variant="outlined">회원 가입 완료</Button>
    </>
  );
}

export default Card;
