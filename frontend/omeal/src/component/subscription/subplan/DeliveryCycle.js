import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { SubTypeAtom } from "../../../recoil/SubscriptionState";

function DeliveryCycle(props) {
  const [subType, setSubType] = useRecoilState(SubTypeAtom);

  const handleChange = (event, newAlignment) => {
    setSubType(newAlignment);
  };

  return (
    <Box sx={{ width: 450 }}>
      <ToggleButtonGroup
        color="primary"
        value={subType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="weekly" aria-label="weekly">
          주간구독
        </ToggleButton>
        <ToggleButton value="monthly" aria-label="monthly">
          월간구독
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default DeliveryCycle;
