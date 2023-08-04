import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

function Register(props) {
  const handleClick = (chipValue) => {
    console.log(chipValue);
  };

  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Box sx={{ width: "500px" }}>
        <Stack spacing={3} alignItems="center" sx={{ marginTop: "10px" }}>
          <Stack direction="row" spacing={1}>
            {[
              "자유게시판",
              "질문/답변",
              "오늘의 밀",
              "맛집 추천",
              "인기글",
            ].map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleClick(chip);
                }}
              />
            ))}
          </Stack>
          <Stack direction="column"></Stack>
        </Stack>

        <TextField sx={{ width: "100%" }} placeholder="글제목 입력하세요" />

        <TextField
          sx={{ width: "100%", marginTop: 5 }}
          id="outlined-multiline-static"
          multiline
          rows={15}
          placeholder="글내용"
        />

        <TextField
          sx={{ width: "100%", marginTop: 5 }}
          type="file"
          placeholder="사진파일 업로드"
        />

        <Button
          variant="contained"
          href="/omealland/register"
          sx={{ marginTop: "30px" }}
        >
          글 등록
        </Button>
      </Box>
    </div>
  );
}

export default Register;
