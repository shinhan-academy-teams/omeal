import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  FoodCategoryAtom,
  SubTypeAtom,
} from "../../../recoil/SubscriptionState";

function CheckPayment(props) {
  const [deliveryDate, setdeliveryDate] = useState();
  const subType = useRecoilValue(SubTypeAtom);
  const foodCategory = useRecoilValue(FoodCategoryAtom);
  const [mealFee, setMealFee] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    axios
      .get("/delivery-info")
      .then(function (response) {
        setdeliveryDate(response.data);
      })
      .catch(function (error) {});

    if (subType === "WEEKLY") {
      setMealFee(39500);
      setDeliveryFee(12500);
    } else {
      setMealFee(150000);
      setDeliveryFee(40000);
    }
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
      <div>
        <Box
          sx={{
            width: 450,
            height: 150,
            backgroundColor: "#FEF7ED",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h6"
            style={{ color: "#FF7F3F", padding: "25px 0px 10px" }}
          >
            첫 배송 예정일 : {deliveryDate}
          </Typography>
          <Typography variant="body1">
            당신의 오밀을 맛있게 요리 중입니다.
          </Typography>
          <Typography variant="body1">다음주에 만나요 :)</Typography>
        </Box>
        <div style={{ padding: "30px 10px 15px" }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="h6" align="left" gutterBottom>
                상품 금액
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" align="right" gutterBottom>
                {mealFee.toLocaleString()}원
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="h6" align="left" gutterBottom>
                배송비
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" align="right" gutterBottom>
                {deliveryFee.toLocaleString()}원
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                align="left"
                gutterBottom
                style={{ font: "bold" }}
              >
                결제 금액
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                align="right"
                gutterBottom
                style={{ color: "#FF7F3F" }}
              >
                회당 {(mealFee + deliveryFee).toLocaleString()}원
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
}

export default CheckPayment;
