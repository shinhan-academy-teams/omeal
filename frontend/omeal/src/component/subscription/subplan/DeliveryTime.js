import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  RadioGroup,
  SvgIcon,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SubTimeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";
import SmallCircularProgress from "component/common/SmallCircularProgress";
import { selectedStyle } from "style";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness3Icon from "@mui/icons-material/Brightness3";

function DeliveryTime(props) {
  const [subTime, setSubTime] = useRecoilState(SubTimeAtom);
  const [typeList, setTypeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩
  const time = {
    아침: "07:00",
    점심: "12:00",
    저녁: "19:00",
  };

  const handleCardClick = (value) => {
    setSubTime(value);
  };

  useEffect(() => {
    axios
      .get("/plan-time")
      .then(function (response) {
        setTypeList(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      {isLoading === true && <SmallCircularProgress />}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <RadioGroup
          color="primary"
          value={subTime}
          exclusive
          aria-label="Platform"
        >
          <Grid container spacing={2}>
            {typeList.map((value, index) => (
              <Grid item xs={4}>
                <Card
                  key={index}
                  value={value}
                  aria-label={value}
                  sx={{
                    boxShadow: subTime === value && selectedStyle,
                    width: "150px",
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(value)}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      {value === "아침" && <WbTwilightIcon />}
                      {value === "점심" && <WbSunnyIcon />}
                      {value === "저녁" && <Brightness3Icon />}
                      <Typography
                        component="div"
                        variant="h6"
                        color="primary.main"
                      >
                        {value}
                      </Typography>
                      <Divider />
                      <br />
                      <Typography>{time[value]}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
    </>
    // * 아침 : 08:00 이전 / 점심 : 12:00 이전 / 저녁 : 19:00 이전에
    // 배달됩니다.
  );
}

export default DeliveryTime;
