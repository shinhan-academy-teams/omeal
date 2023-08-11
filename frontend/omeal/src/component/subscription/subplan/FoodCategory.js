import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ContainerTypeAtom,
  FoodCategoryAtom,
} from "../../../recoil/SubscriptionState";
import axios from "axios";
import noodleImg from "../../../assets/img/menuCategory/noodle.png";
import bibimbapImg from "../../../assets/img/menuCategory/bibimbap.png";
import saladImg from "../../../assets/img/menuCategory/salad.png";
import sandwichImg from "../../../assets/img/menuCategory/sandwich.png";
import soupImg from "../../../assets/img/menuCategory/soup.png";
import homeImg from "../../../assets/img/menuCategory/home.png";
import Swal from "sweetalert2";

function FoodCategory(props) {
  const [foodCategory, setFoodCategory] = useRecoilState(FoodCategoryAtom);
  const [typeList, setTypeList] = useState([]);

  const handleCardClick = (value) => {
    setFoodCategory(value);
  };

  // Style
  const selectedStyle = "0px 4px 8px rgba(1, 1, 1, 1)";
  const boxStyle = {
    display: "flex",
    flexDirection: "row",
  };

  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/plan-mealtype")
      .then(function (response) {
        const result = response.data;
        setTypeList(result);
        setIsLoading(false);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      {isLoading === true && <CircularProgress />}
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 2, ml: 3, mr: 3 }}
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
                sx={{ boxShadow: foodCategory === "면류" && selectedStyle }}
              >
                <CardActionArea onClick={() => handleCardClick("면류")}>
                  <Box style={boxStyle}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <FormControlLabel
                        value="면류"
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
                sx={{ boxShadow: foodCategory === "비빔밥" && selectedStyle }}
              >
                <CardActionArea onClick={() => handleCardClick("비빔밥")}>
                  <Box style={boxStyle}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <FormControlLabel
                        value="비빔밥"
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
                sx={{ boxShadow: foodCategory === "샐러드" && selectedStyle }}
              >
                <CardActionArea onClick={() => handleCardClick("샐러드")}>
                  <Box style={boxStyle}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <FormControlLabel
                        value="샐러드"
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
                  boxShadow: foodCategory === "샌드위치" && selectedStyle,
                }}
              >
                <CardActionArea onClick={() => handleCardClick("샌드위치")}>
                  <Box style={boxStyle}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <FormControlLabel
                        value="샌드위치"
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
                sx={{ boxShadow: foodCategory === "국밥" && selectedStyle }}
              >
                <CardActionArea onClick={() => handleCardClick("국밥")}>
                  <Box style={boxStyle}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <FormControlLabel
                        value="국밥"
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
                sx={{ boxShadow: foodCategory === "가정식" && selectedStyle }}
              >
                <CardActionArea onClick={() => handleCardClick("가정식")}>
                  <Box style={boxStyle}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <FormControlLabel
                        value="가정식"
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
    </>
  );
}

export default FoodCategory;
