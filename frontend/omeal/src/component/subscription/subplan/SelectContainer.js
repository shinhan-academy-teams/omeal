import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { ContainerTypeAtom } from "../../../recoil/SubscriptionState";


function SelectContainer(props) {
  const [containerType, setContainerType] = useRecoilState(ContainerTypeAtom);

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
