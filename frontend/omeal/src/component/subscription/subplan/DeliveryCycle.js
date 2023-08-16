import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SubTypeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";
import SmallCircularProgress from "component/common/SmallCircularProgress";
import { selectedStyle } from "style";

function DeliveryCycle(props) {
  const [subType, setSubType] = useRecoilState(SubTypeAtom);
  const [typeList, setTypeList] = useState({});

  console.log("제발 : " + subType);

  const handleCardClick = (value) => {
    setSubType(value);
  };

  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/plan-subtype")
      .then(function (response) {
        setTypeList({
          주간구독: response.data[0],
          월간구독: response.data[1],
        });
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
          value={subType}
          exclusive
          // onChange={handleChange}
          aria-label="Platform"
        >
          <Grid container spacing={2}>
            {Object.keys(typeList).map((key) => (
              <Grid item xs={6}>
                <Card
                  key={key}
                  value={typeList[key]}
                  aria-label={typeList[key]}
                  sx={{
                    boxShadow: subType === typeList[key] && selectedStyle,
                    width: "240px",
                  }}
                >
                  <CardActionArea
                    onClick={() => handleCardClick(typeList[key])}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="div"
                        variant="h6"
                        color="primary.main"
                      >
                        {key} {key === "주간구독" ? "(7일)" : "(30일)"}
                      </Typography>
                      <Divider />
                      <br />
                      <Typography>
                        {key === "주간구독" ? "\\ 52,000원" : "\\ 190,000원"}
                      </Typography>
                      <Typography>(배송비 포함)</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
    </>
  );
}

export default DeliveryCycle;
