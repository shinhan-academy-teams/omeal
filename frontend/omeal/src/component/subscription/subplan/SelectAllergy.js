import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { AllergyAtom } from "../../../recoil/SubscriptionState";
import a from "../../../assets/img/foodAllergy/1.png";
import b from "../../../assets/img/foodAllergy/2.png";
import c from "../../../assets/img/foodAllergy/3.png";
import d from "../../../assets/img/foodAllergy/4.png";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allergyFood = [
  "계란",
  "유제품",
  "밀가루",
  "돼지고기",
  "소고기",
  "콩/견과류",
];

function getStyles(name, Allergy, theme) {
  return {
    fontWeight:
      Allergy.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SelectAllergy(props) {
  const theme = useTheme();
  const [Allergy, setAllergy] = useRecoilState(AllergyAtom);
  const [isAllergy, setIsAllergy] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAllergy([]);
    setIsAllergy(newAlignment);
  };

  const handleChange2 = (event, newAlignment) => {
    const {
      target: { value },
    } = event;
    setAllergy(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Card
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={d}
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            ></CardMedia>
            <Divider></Divider>
          </Card>
          <Grid item xs={1} />
        </Grid>

        <Grid item xs={3}>
          <ToggleButtonGroup
            sx={{
              paddingTop: 1,
              paddingLeft: 8,
              borderColor: "rgb(0 0 0 / 25%)",
              height: 55,
            }}
            color="primary"
            exclusive
            onChange={handleChange}
            value={isAllergy}
            aria-label="Platform"
          >
            <ToggleButton value="true">없어요</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">
              알러지를 선택하세요.
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={Allergy}
              onChange={handleChange2}
              disabled={isAllergy}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {allergyFood.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, Allergy, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectAllergy;
