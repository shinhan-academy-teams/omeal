import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";

function Register(props) {
  const memberId = useRecoilValue(SignInState);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  //const [inputPhoto, setInputPhoto] = [useState("")];

  // 토글
  const [selectedOption, setSelectedOption] = useState("");

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const handleInputContents = (e) => {
    setInputContents(e.target.value);
  };

  const changeOption = (value) => {
    setSelectedOption(value);
    console.log(selectedOption);
  };
  const radioOptions = [
    {
      value: "자유게시판",
      label: "자유게시판",
    },
    {
      value: "질문/답변",
      label: "질문/답변",
    },
    {
      value: "오늘의 밀",
      label: "오늘의 밀",
    },
    {
      value: "맛집 추천",
      label: "맛집 추천",
    },
    {
      value: "인기글",
      label: "인기글",
    },
  ];

  const onClickRegister = (e) => {
    axios({
      method: "post",
      url: "/board/register",
      data: JSON.stringify({
        member: { memberId: memberId },
        title: inputTitle,
        content: inputContents,
        // photo: inputPhoto,
        category: selectedOption,
        townName: "샌드럴파크",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box sx={{ width: "500px" }}>
        {/* 토글버튼 */}
        <FormControl
          sx={{
            p: "5px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {radioOptions.map((radioOption) => {
              return (
                <FormControlLabel
                  value={radioOption.value}
                  key={radioOption.value}
                  control={
                    <Chip
                      color="primary"
                      label={radioOption.label}
                      variant={
                        selectedOption === radioOption.value
                          ? "filled"
                          : "outlined"
                      }
                      sx={{ m: "5px" }}
                      onClick={() => changeOption(radioOption.value)}
                    />
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        <TextField
          sx={{ width: "100%" }}
          placeholder="글제목 입력하세요"
          name="title"
          value={inputTitle}
          onChange={handleInputTitle}
        />

        <TextField
          sx={{ width: "100%", marginTop: 3 }}
          id="outlined-multiline-static"
          multiline
          rows={15}
          placeholder="글내용"
          value={inputContents}
          name="content"
          onChange={handleInputContents}
        />

        <TextField
          sx={{ width: "100%", marginTop: 3 }}
          type="file"
          placeholder="사진파일 업로드"
          // value={setInputPhoto}
        />

        <Button
          variant="contained"
          href="/omealland/register"
          sx={{ marginTop: "30px" }}
          onClick={onClickRegister}
        >
          글 등록
        </Button>
      </Box>
    </div>
  );
}

export default Register;
