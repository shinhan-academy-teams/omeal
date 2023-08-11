import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ContainerTypeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";
import multiUseContainer from "../../../assets/img/subscription/multi_use_container.png";
import disposableContainer from "../../../assets/img/subscription/disposable_container.png";

function SelectContainer(props) {
  const [containerType, setContainerType] = useRecoilState(ContainerTypeAtom);
  // const [typeList, setTypeList] = useState([]); // 왜 axios로 받아오는지 몰라서 주석 처리

  const [selectedValue, setSelectedValue] = useState(null);
  const handleCardClick = (value) => {
    setSelectedValue(value);
    if (value === "일회용기") {
      setContainerType(value);
    } else if (value === "다회용기") {
      setContainerType(value);
    }
    console.log("카드 클릭함 : " + value);
  };

  const selectedStyle = "0px 4px 8px rgba(1, 1, 1, 1)";

  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 왜 axios로 받아오는지 몰라서 주석 처리
    axios
      .get("/plan-container")
      .then(function (res) {
        const result = res.data;
        //setTypeList(res.data);
        setIsLoading(false);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      {isLoading === true && <CircularProgress />}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="primary.main">
              (미선택 시 일회용기로 드립니다)
            </Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Card
              sx={{
                boxShadow: selectedValue === "일회용기" && selectedStyle,
              }}
            >
              <CardActionArea onClick={() => handleCardClick("일회용기")}>
                <CardMedia
                  component="img"
                  image={disposableContainer}
                ></CardMedia>
                <CardContent>
                  <Typography color="primary" variant="h6">
                    일회용기
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card
              sx={{
                boxShadow: selectedValue === "다회용기" && selectedStyle,
              }}
            >
              <CardActionArea onClick={() => handleCardClick("다회용기")}>
                <CardMedia
                  component="img"
                  image={multiUseContainer}
                ></CardMedia>
                <CardContent>
                  <Typography color="primary" variant="h6">
                    다회용기
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Box>
    </>
  );
}

export default SelectContainer;
