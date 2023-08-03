import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { FoodCategoryAtom } from "../../../recoil/SubscriptionState";

function FoodCategory(props) {
  const [foodCategory, setFoodCategory] = useRecoilState(FoodCategoryAtom);

  const handleChange = (event) => {
    setFoodCategory(event.target.value);
  };
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
          <Grid item xs={6}>
            <FormControlLabel
              value="homemeal"
              control={<Radio />}
              label="가정식"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              value="ricesoup"
              control={<Radio />}
              label="국밥"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              value="bibimbap"
              control={<Radio />}
              label="비빔밥"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="noodle" control={<Radio />} label="면" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              value="salad"
              control={<Radio />}
              label="샐러드"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              value="sandwich"
              control={<Radio />}
              label="샌드위치"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </Box>
  );
}

export default FoodCategory;
