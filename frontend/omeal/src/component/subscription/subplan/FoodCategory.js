import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FoodCategoryAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";
import noodleImg from "../../../assets/img/subscriptionFoodCategory/noodleFood.png";
import bibimbapImg from "../../../assets/img/subscriptionFoodCategory/bibimbapFood.png";
import sandwichImg from "../../../assets/img/subscriptionFoodCategory/sandwichFood.png";
import saladImg from "../../../assets/img/subscriptionFoodCategory/saladFood.png";
import soupImg from "../../../assets/img/subscriptionFoodCategory/soupFood.png";
import homeImg from "../../../assets/img/subscriptionFoodCategory/homeFood.png";
import SmallCircularProgress from "component/common/SmallCircularProgress";
import { cardContentStyle, selectedStyle } from "style";

function FoodCategory(props) {
  const [foodCategory, setFoodCategory] = useRecoilState(FoodCategoryAtom);
  const [typeList, setTypeList] = useState([]);

  const handleCardClick = (value) => {
    setFoodCategory(value);
  };

  // Style
  const boxStyle = {
    display: "flex",
    flexDirection: "row",
  };

  console.log(foodCategory);

  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/plan-mealtype")
      .then(function (response) {
        const result = response.data;
        setTypeList(result);
      })
      .catch(function (error) {});

    // 이미지 로딩 관련 코드
    const imagePromises = [];
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = resolve;
        img.onerror = reject;
      });
    };
    const images = [
      noodleImg,
      bibimbapImg,
      saladImg,
      sandwichImg,
      soupImg,
      homeImg,
    ]; // CardMedia에 사용되는 이미지 배열
    images.forEach((image) => {
      imagePromises.push(loadImage(image));
    });
    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("이미지 로딩 중 오류 발생:", error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <SmallCircularProgress />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            ml: 1,
            mr: 1,
          }}
        >
          <RadioGroup
            aria-labelledby="storage-label"
            size="lg"
            sx={{ gap: 1.5 }}
            value={foodCategory}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card
                  sx={{
                    boxShadow: foodCategory === "면장님" && selectedStyle,
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick("면장님")}>
                    <Box style={boxStyle}>
                      <CardContent
                        sx={{ flex: "1 0 auto" }}
                        style={cardContentStyle.padding}
                      >
                        <FormControlLabel
                          value="면장님"
                          control={<Radio />}
                          label="면류"
                        />
                        <Typography component="div" variant="h6">
                          면장님
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={noodleImg}
                        alt=""
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    boxShadow: foodCategory === "비빔대감" && selectedStyle,
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick("비빔대감")}>
                    <Box style={boxStyle}>
                      <CardContent
                        sx={{ flex: "1 0 auto" }}
                        style={cardContentStyle.padding}
                      >
                        <FormControlLabel
                          value="비빔대감"
                          control={<Radio />}
                          label="비빔밥"
                        />
                        <Typography component="div" variant="h6">
                          비빔대감
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={bibimbapImg}
                        alt=""
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    boxShadow: foodCategory === "샐러디안" && selectedStyle,
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick("샐러디안")}>
                    <Box style={boxStyle}>
                      <CardContent
                        sx={{ flex: "1 0 auto" }}
                        style={cardContentStyle.padding}
                      >
                        <FormControlLabel
                          value="샐러디안"
                          control={<Radio />}
                          label="샐러드"
                        />
                        <Typography component="div" variant="h6">
                          샐러디안
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={saladImg}
                        alt=""
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    boxShadow: foodCategory === "샌드위치백작" && selectedStyle,
                  }}
                >
                  <CardActionArea
                    onClick={() => handleCardClick("샌드위치백작")}
                  >
                    <Box style={boxStyle}>
                      <CardContent
                        sx={{ flex: "1 0 auto" }}
                        style={cardContentStyle.padding}
                      >
                        <FormControlLabel
                          value="샌드위치백작"
                          control={<Radio />}
                          label="샌드위치"
                        />
                        <Typography component="div" variant="h6">
                          샌드위치백작
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={sandwichImg}
                        alt=""
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    boxShadow: foodCategory === "국밥부장관" && selectedStyle,
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick("국밥부장관")}>
                    <Box style={boxStyle}>
                      <CardContent
                        sx={{ flex: "1 0 auto" }}
                        style={cardContentStyle.padding}
                      >
                        <FormControlLabel
                          value="국밥부장관"
                          control={<Radio />}
                          label="국밥"
                        />
                        <Typography component="div" variant="h6">
                          국밥부장관
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={soupImg}
                        alt=""
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{ boxShadow: foodCategory === "애국자" && selectedStyle }}
                >
                  <CardActionArea onClick={() => handleCardClick("애국자")}>
                    <Box style={boxStyle}>
                      <CardContent
                        sx={{ flex: "1 0 auto" }}
                        style={cardContentStyle.padding}
                      >
                        <FormControlLabel
                          value="애국자"
                          control={<Radio />}
                          label="가정식"
                        />
                        <Typography component="div" variant="h6">
                          애국자
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={homeImg}
                        alt=""
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </RadioGroup>
        </Box>
      )}
    </>
  );
}

export default FoodCategory;
