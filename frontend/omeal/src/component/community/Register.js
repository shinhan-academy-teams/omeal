import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import AWS from "aws-sdk";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navi = useNavigate();

  const memberId = useRecoilValue(SignInState);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContents, setInputContents] = useState("");
  const [selectTownName, setSelectTownName] = useState("");

  //사진 업로드
  const [progress, setProgress] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  //s3
  const ACCESS_KEY = "AKIA2RBV2QZZXODHE65T"; // S3 액세스키
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY; //시크릿 키
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "omeal-jomeal";

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
  };

  const radioOptions = [
    {
      value: "자유게시판",
      label: "자유게시판",
    },
    {
      value: "QnA",
      label: "질문/답변",
    },
    {
      value: "오늘의밀",
      label: "오늘의밀",
    },
    {
      value: "맛집추천",
      label: "맛집추천",
    },
  ];

  const town = {
    코리아타운: "homemeal",
    비빔연구소: "bibimbap",
    녹색지대: "salad",
    샌드럴파크: "sandwich",
    국밥부: "ricesoup",
    면사무소: "noodle",
  };

  //AWS 연결
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
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

  var photoString = "";
  for (var i = 0; i < selectedPhoto.length; i++) {
    photoString += "picture/" + selectedPhoto[i].name + "@";
  }

  const uploadFile = (file) => {
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
        if (err) {
          console.log(err);
        }
      });
  };

  const onClickRegister = (e) => {
    if (selectTownName.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "타운을 선택해주세요",
      });
    } else if (inputTitle.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "제목을 입력해주세요",
      });
    } else if (selectedOption.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "카테고리를 골라주세요",
      });
    } else if (inputContents.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "게시물을 작성해주세요",
      });
    } else {
      axios({
        method: "post",
        url: "/board/register",
        data: JSON.stringify({
          member: { memberId: memberId },
          title: inputTitle,
          content: inputContents,
          photo: photoString,
          category: selectedOption,
          townName: selectTownName,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.data === "postSuccess") {
            navi(`/omealland/${town[selectTownName]}`);
          } else {
            Swal.fire({
              icon: "warning",
              title: "글 작성 실패😭",
              text: "다시 등록해주세요.",
            }).then(() => window.location.reload());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleTown = (event) => {
    setSelectTownName(event.target.value);
  };

  return (
    <div>
      <Box sx={{ width: "500px" }}>
        <FormControl fullWidth sx={{ marginTop: "30px" }}>
          <InputLabel id="demo-simple-select-label">타운 선택</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectTownName}
            label="town"
            onChange={handleTown}
          >
            <MenuItem value={"코리아타운"}>코리아타운</MenuItem>
            <MenuItem value={"국밥부"}>국밥부</MenuItem>
            <MenuItem value={"비빔연구소"}>비빔연구소</MenuItem>
            <MenuItem value={"녹색지대"}>녹색지대</MenuItem>
            <MenuItem value={"면사무소"}>면사무소</MenuItem>
            <MenuItem value={"샌드럴파크"}>샌드럴파크</MenuItem>
          </Select>
        </FormControl>
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
          <Alert severity="info" sx={{ margin: "5px" }}>
            업로드 진행률:{progress}%
          </Alert>
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
            <Button
              color="primary"
              variant="outlined"
              sx={{ height: "55px", marginTop: 3, marginLeft: 2 }}
              onClick={() => uploadFile(selectedPhoto)}
            >
              업로드
            </Button>
          ) : null}
        </div>

        <Button
          variant="contained"
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
