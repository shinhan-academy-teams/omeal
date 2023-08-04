import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FoodCategoryAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";

function FoodCategory(props) {
  const [foodCategory, setFoodCategory] = useRecoilState(FoodCategoryAtom);
  const [typeList, setTypeList] = useState([]);

  const handleChange = (event) => {
    setFoodCategory(event.target.value);
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
    <Box sx={{ width: 450 }}>
      <RadioGroup
        aria-labelledby="storage-label"
        size="lg"
        sx={{ gap: 1.5 }}
        value={foodCategory}
        onChange={handleChange}
      >
        <Grid container spacing={6} style={{ margin: "20px 0px" }}>
          {typeList.map((value, index) => (
            <Grid item xs={6} key={index}>
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={value}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
}

export default FoodCategory;
