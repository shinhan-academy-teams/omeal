import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

function SelectContainer(props) {
  const [containerType, setContainerType] = useState("weekly");

  const handleChange = (event, newAlignment) => {
    setContainerType(newAlignment);
  };
  return (
    <Box sx={{ width: 450 }}>
      <ToggleButtonGroup
        color="primary"
        value={containerType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="disposable" aria-label="disposable">
          일회용기
        </ToggleButton>
        <ToggleButton value="multiple" aria-label="multiple">
          다회용기
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default SelectContainer;
