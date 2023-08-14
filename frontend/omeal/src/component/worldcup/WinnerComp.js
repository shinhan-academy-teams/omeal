import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import slogan from "../../pages/worldcup/slogan";
import { useNavigate } from "react-router-dom";
import { jsConfetti } from "../../App";

function WinnerComp({ data }) {
  const navi = useNavigate();
  const winner = data[0];

  useEffect(() => {
    jsConfetti.addConfetti({
      confettiColors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
      ],
      confettiRadius: 10,
      confettiNumber: 400,
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/img/worldcup/worldcup-winner.png")`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          height: "max-content",
          pt: "170px",
          mt: "-18px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: "18px",
            color: "#EA5C2B",
            fontWeight: "bold",
            textShadow: "1px 1px 2px #a4a4a4",
          }}
        >
          【 우 승 】
        </Typography>
        <Typography variant="h5">
          {winner.name}(을)를 최애로 선택한 당신,
        </Typography>
        <Box
          sx={{
            my: 2,
            display: "flex",
            width: "100%",
            height: "auto",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              "&:hover": { transform: "scale(1.07)" },
              transitionProperty: "all",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-out",
              borderRadius: "20px",
              width: "250px",
              height: "250px",
              backgroundColor: "skyblue",
              backgroundImage: `url("${process.env.PUBLIC_URL}/img/worldcup/food-img/${winner.src}.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
            key={winner.name}
          >
            <Typography
              sx={{
                fontSize: "24px",
                color: "white",
                textShadow: "0px 0px 17px #000",
              }}
            >
              {winner.name}
            </Typography>
          </Paper>
        </Box>
        <Typography variant="h4" mt={3}>
          당신은 <span style={{ fontWeight: "bold" }}>{winner.category}</span>!
        </Typography>
        <Paper
          elevation={2}
          sx={{
            borderRadius: "20px",
            width: "80%",
            height: "max-content",
            py: 3,
            margin: "24px auto 0",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            ❝
            <span style={{ fontStyle: "italic" }}>
              {slogan[winner.category][0]}
            </span>{" "}
            ❞
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2, px: 3, width: "max-content", fontSize: "20px" }}
            onClick={() => navi(`/omealland/${slogan[winner.category][2]}`)}
          >
            {slogan[winner.category][1]} 놀러가기
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default WinnerComp;
