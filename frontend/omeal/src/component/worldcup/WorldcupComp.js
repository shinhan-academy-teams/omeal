import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import items from "../../pages/worldcup/contents";
import WinnerComp from "./WinnerComp";

const WorldcupComp = () => {
  const [foods, setFoods] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [round, setRound] = useState(32);

  useEffect(() => {
    items.sort(() => Math.random() - 0.5);
    setFoods(items);
    setDisplays([items[0], items[1]]);
    setRound(32);
  }, []);

  const clickHandler = (selectedFood) => (d) => {
    if (displays.length === 1) return; // 우승하면 클릭 막기
    if (foods.length > 2) {
      // 선택해야할 것들이 2개보다 많을때
      setWinners([...winners, selectedFood]); // 선택한 것을 winners에 넣고
      setDisplays([foods[2], foods[3]]); // 보여질 것을 셋팅(현재 0번째 vs 1번째 대결해서 한 녀석이 선택당함. 그래서 다음은 2번째 vs 3번째)
      setFoods(foods.slice(2)); // 0번째, 1번째 삭제
    } else {
      // 선택해야할 것들이 2개이하 일때

      setRound(round / 2);

      if (winners.length === 0) {
        // 우승
        setDisplays([selectedFood]);
      } else {
        // 다음 라운드(ex. 16강 -> 8강)
        let updatedFood = [...winners, selectedFood];
        setFoods(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
      }
    }
  };

  return (
    <>
      {displays.length === 1 ? (
        <WinnerComp data={displays} />
      ) : (
        <Box
          sx={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/img/worldcup/worldcup-background.png")`,
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            height: "500px",
            pt: "242px",
            mt: "12px",
          }}
        >
          {round > 1 && (
            <Typography
              variant="h3"
              sx={{
                mb: "72px",
                color: "#EA5C2B",
                fontWeight: "bold",
                textShadow: round > 2 ? "1px 1px 2px #a4a4a4" : "",
              }}
            >
              {round > 2 ? round + "강" : "【 결 승 전 】"}
            </Typography>
          )}
          <Box
            sx={{
              my: 5,
              display: "flex",
              width: "100%",
              height: "auto",
              justifyContent: "center",
            }}
          >
            {displays.map((d) => {
              return (
                <Paper
                  elevation={8}
                  sx={{
                    "&:hover": { transform: "scale(1.07)" },
                    transitionProperty: "all",
                    transitionDuration: "0.2s",
                    transitionTimingFunction: "ease-out",
                    cursor: "pointer",
                    mx: "8px",
                    borderRadius: "20px",
                    width: "270px",
                    height: "270px",
                    backgroundColor: "skyblue",
                    backgroundImage: `url("${process.env.PUBLIC_URL}/img/worldcup/food-img/${d.src}.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                  key={d.name}
                  onClick={clickHandler(d)}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      textShadow: "0px 0px 17px #000",
                    }}
                  >
                    {d.name}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
          {round > 1 && (
            <Typography variant="h5">
              {round > 2 &&
                "【" + (round - foods.length + 2) / 2 + "/" + round / 2 + "】"}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default WorldcupComp;
