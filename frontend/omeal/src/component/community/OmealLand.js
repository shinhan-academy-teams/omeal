import React from "react";
import omealland from "../../assets/img/omealland/omalland-map.png";
import background from "../../assets/img/omealland/omealland-background.png";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OmealLand(props) {
  const navi = useNavigate();

  const handleClick = (value) => {
    navi("/omealland/" + value);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#83D9F2",
          backgroundImage: `url(${background})`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          display: "grid",
          alignContent: "center",
        }}
      >
        <Box sx={{ width: "600px", aspectRatio: "1 / 1" }}>
          <img
            alt="오밀랜드"
            src={omealland}
            style={{
              width: "100%",
              height: "100%",
            }}
          />

          <Grid container spacing={2} mt="-600px" sx={{ height: "600px" }}>
            <Grid item xs={6} mt="8%">
              <Button
                type="button"
                onClick={() => handleClick("sandwich")}
                sx={{
                  ml: 9,
                  width: "120px",
                  height: "100px",
                  opacity: 0,
                }}
              />
            </Grid>
            <Grid item xs={6} mt="8%">
              <Button
                type="button"
                onClick={() => handleClick("bibimbap")}
                sx={{
                  mr: 11,
                  width: "120px",
                  height: "100px",
                  opacity: 0,
                }}
              />
            </Grid>

            <Grid item xs={6} mt="8%">
              <Button
                type="button"
                onClick={() => handleClick("ricesoup")}
                sx={{
                  ml: -20,
                  width: "120px",
                  height: "100px",
                  opacity: 0,
                }}
              />
            </Grid>
            <Grid item xs={6} mt="8%">
              <Button
                type="button"
                onClick={() => handleClick("salad")}
                sx={{
                  ml: 17,
                  width: "120px",
                  height: "100px",
                  opacity: 0,
                }}
              />
            </Grid>

            <Grid item xs={6} mt="10%">
              <Button
                type="button"
                onClick={() => handleClick("noodle")}
                sx={{
                  ml: 9,
                  width: "120px",
                  height: "100px",
                  opacity: 0,
                }}
              />
            </Grid>
            <Grid item xs={6} mt="10%">
              <Button
                type="button"
                onClick={() => handleClick("homemeal")}
                sx={{
                  mr: 11,
                  width: "120px",
                  height: "100px",
                  opacity: 0,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default OmealLand;
