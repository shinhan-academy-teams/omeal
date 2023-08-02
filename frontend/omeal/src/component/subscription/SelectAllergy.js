import {
  Autocomplete,
  Box,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";

function SelectAllergy(props) {
  const [isAllergy, setIsAllergy] = useState(false);

  const handleChange = (event, newAlignment) => {
    setIsAllergy(newAlignment);
  };
  return (
    <Box sx={{ width: 450 }}>
      <Grid container spacing={2} style={{ margin: "20px 0px" }}>
        <Grid item xs={3}>
          <ToggleButtonGroup
            color="primary"
            value={isAllergy}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="true">없어요</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={3} sx={{ width: 300 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={allergyFood}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              disabled={isAllergy}
              onFocus={(e) => {
                e.preventDefault();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="알러지를 선택하세요"
                  placeholder="알러지"
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

const allergyFood = [
  { title: "계란", allergy: "계란" },
  { title: "유제품", allergy: "유제품" },
  { title: "밀가루", allergy: "밀가루" },
  { title: "돼지고기", allergy: "돼지고기" },
  { title: "소고기", allergy: "소고기" },
  { title: "콩/견과류", allergy: "콩/견과류" },
];

export default SelectAllergy;
