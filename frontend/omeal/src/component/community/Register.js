import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import AWS from "aws-sdk";
import { useEffect } from "react";

function Register(props) {
  const memberId = useRecoilValue(SignInState);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  //const [inputPhoto, setInputPhoto] = [useState("")];

  //사진 업로드
  const [progress, setProgress] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  //s3
  const ACCESS_KEY = "AKIA2RBV2QZZ5S3CQ74Y"; // S3 액세스키
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY; //시크릿 키
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "omeal-jomeal";
  console.log("시크릿키", SECRET_ACCESS_KEY);

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

  //AWS 연결
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    scretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handlePhotoInput = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      //파일갯수만큼 반복
      const file = e.target.files[i];
      const fileExt = file.name.split(".").pop();

      if (
        (file.type !== "image/jpeg" || fileExt !== "jpeg") &
        (file.type !== "image/png" || fileExt !== "png") &
        (file.type !== "image/jpg" || fileExt !== "jpg")
      ) {
        alert("jpg, jpeg, png파일만 업로드 가능합니다.");
        return;
      }
      setProgress(0);
      setSelectedPhoto(e.target.files);
    }
  };

  useEffect(() => {
    console.log("사진", selectedPhoto);
  }, [selectedPhoto]);

  var photoString = "";
  for (var i = 0; i < selectedPhoto.length; i++) {
    console.log("사진이름", selectedPhoto[i].name);
    photoString += "picture/" + selectedPhoto[i].name + "@";
  }

  const uploadFile = (file) => {
    console.log("~~사진 파일!!!!", file[0].type);

    const params = {
      ACL: "public-read",
      Body: file[0],
      Bucket: S3_BUCKET,
      Key: "picture/" + file[0].name,
      ContentType: file[0].type,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedPhoto([]);
        }, 3000);
      })
      .send((err) => {
        if (err) console.log("에러", err);
      });
  };

  const onClickRegister = (e) => {
    axios({
      method: "post",
      url: "/board/register",
      data: JSON.stringify({
        member: { memberId: memberId },
        title: inputTitle,
        content: inputContents,
        photo: photoString,
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

        {/* 사진등록 */}
        {showAlert ? (
          <Alert severity="info">업로드 진행률:{progress}%</Alert>
        ) : (
          <Typography />
        )}
        <div>
          <TextField
            sx={{ width: "80%", marginTop: 3 }}
            type="file"
            placeholder="사진파일 업로드"
            onChange={handlePhotoInput}
            accept={"image/*"}
          />
          {selectedPhoto.length > 0 ? (
            <Button color="primary" onClick={() => uploadFile(selectedPhoto)}>
              업로드
            </Button>
          ) : null}
        </div>

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
