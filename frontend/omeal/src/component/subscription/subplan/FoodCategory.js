import {
  Box,
  Card,
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
import noodleImg from "../../../assets/img/menuCategory/noodle.png";
import bibimbapImg from "../../../assets/img/menuCategory/bibimbap.png";
import saladImg from "../../../assets/img/menuCategory/salad.png";
import sandwichImg from "../../../assets/img/menuCategory/sandwich.png";
import soupImg from "../../../assets/img/menuCategory/soup.png";
import homeImg from "../../../assets/img/menuCategory/home.png";

function FoodCategory(props) {
  const [foodCategory, setFoodCategory] = useRecoilState(FoodCategoryAtom);
  const [typeList, setTypeList] = useState([]);

  const handleChange = (event) => {
    setFoodCategory(event.target.value);
  };

  const style = {
    cardStyle: {
      display: "flex",
      justifyContent: "space-between",
      //alignContent: "space-between",
    },
  };

  useEffect(() => {
    axios
      .get("/plan-mealtype")
      .then(function (response) {
        setTypeList(response.data);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 2, ml: 2, mr: 2 }}
      >
        <RadioGroup
          aria-labelledby="storage-label"
          size="lg"
          sx={{ gap: 1.5 }}
          value={foodCategory}
          onChange={handleChange}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={style.cardStyle}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={noodleImg}
                  alt=""
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={style.cardStyle}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={bibimbapImg}
                  alt=""
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={style.cardStyle}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={saladImg}
                  alt=""
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={style.cardStyle}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={sandwichImg}
                  alt=""
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={style.cardStyle}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={soupImg}
                  alt=""
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={style.cardStyle}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={homeImg}
                  alt=""
                />
              </Card>
            </Grid>
          </Grid>
        </RadioGroup>
      </Box>
    </>
  );
}

export default FoodCategory;
