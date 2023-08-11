import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // 수평 가운데 정렬
        alignItems: "center", // 수직 가운데 정렬
        height: "70vh", // 화면 세로 크기 만큼의 높이 설정
      }}
    >
      <CircularProgress />
    </Box>
  );
}
