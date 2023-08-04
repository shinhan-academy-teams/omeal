import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function FeedbackComp(props) {
  return (
    <>
      <Box
        my={3}
        sx={{
          width: "80%",
          backgroundColor: "#FEF7ED",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h6" py={3}>
          <span style={{ color: "#FF7F3F" }}>오늘의 밀은 어떠셨나요?</span>
          <br />
          피드백을 남겨주시면
          <br />
          다음 식사부터 반영하겠습니다 :)
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          width: "80%",
          aspectRatio: 1 / 1,
          borderRadius: "20px",
        }}
      >
        성향 마다 메뉴 개수가 다른데 어떻게 만들어야 할지 모르겠음
      </Paper>
    </>
  );
}

export default FeedbackComp;
