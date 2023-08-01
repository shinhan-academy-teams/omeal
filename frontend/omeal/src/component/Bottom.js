import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MopedIcon from "@mui/icons-material/Moped";
import EggIcon from "@mui/icons-material/Egg";

function Bottom(props) {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          style={{ backgroundColor: "gray" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="홈" icon={<HomeIcon />} />
          <BottomNavigationAction label="커뮤니티" icon={<Diversity3Icon />} />

          <BottomNavigationAction
            icon={
              <EggIcon
                sx={{ display: "flex", marginBottom: 10, fontSize: 150 }}
              />
            }
          />

          <BottomNavigationAction label="오늘의 밀" icon={<MopedIcon />} />
          <BottomNavigationAction label="마이페이지" icon={<EggIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Bottom;
