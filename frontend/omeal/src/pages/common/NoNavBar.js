import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logoImg from "../../assets/img/logo/color_logo.png";
import { Box, Paper } from "@mui/material";

function NoNavBar(props) {
  const navi = useNavigate();

  return (
    <>
      <Paper elevation={8} sx={{ margin: "16px 0", height: "95vh" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#FEF7ED",
          }}
        >
          <img
            alt="color logo"
            src={logoImg}
            style={{
              marginTop: "5px",
              height: "15%",
              cursor: "pointer",
            }}
            onClick={() => {
              navi("/");
            }}
          />
          <Outlet />
        </Box>
      </Paper>
    </>
  );
}

export default NoNavBar;
