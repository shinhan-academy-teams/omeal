import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function CheckPayment(props) {
  return (
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
          첫 배송 예정일 :{" "}
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
              {""}원
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
              {""}원
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
              회당 {""}원
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CheckPayment;
