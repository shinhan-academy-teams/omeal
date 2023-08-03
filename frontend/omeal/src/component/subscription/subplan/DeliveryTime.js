import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { SubTimeAtom } from "../../../recoil/SubscriptionState";

function DeliveryTime(props) {
  const [subTime, setSubTime] = useRecoilState(SubTimeAtom);
  const handleChange = (event, newAlignment) => {
    setSubTime(newAlignment);
  };
  return (
    <Box sx={{ width: 450 }}>
      <ToggleButtonGroup
        color="primary"
        value={subTime}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="breakfast" aria-label="breakfast">
          아침
        </ToggleButton>
        <ToggleButton value="lunch" aria-label="lunch">
          점심
        </ToggleButton>
        <ToggleButton value="dinner" aria-label="dinner">
          저녁
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <br />
      <pre>
        * 아침 : 08:00 이전 / 점심 : 12:00 이전 / 저녁 : 19:00 이전에
        배달됩니다.
      </pre>
    </Box>
  );
}

export default DeliveryTime;
