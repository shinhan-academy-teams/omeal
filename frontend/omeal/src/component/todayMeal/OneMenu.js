import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function OneMenu(props) {
  return (
    <>
      <Grid item xs={9}>
        <Typography variant="body2">{} 메뉴 이름</Typography>
      </Grid>
      <Grid item xs={1.5}>
        <IconButton aria-label="ThumbDownOffAlt">
          <ThumbDownOffAltIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1.5}>
        <IconButton aria-label="ThumbUpOffAlt">
          <ThumbUpOffAltIcon />
        </IconButton>
      </Grid>
    </>
  );
}

export default OneMenu;
