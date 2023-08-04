import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ContainerTypeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";

function SelectContainer(props) {
  const [containerType, setContainerType] = useRecoilState(ContainerTypeAtom);
  const [typeList, setTypeList] = useState([]);

  const handleChange = (event, newAlignment) => {
    setContainerType(newAlignment);
  };

  useEffect(() => {
    axios
      .get("/plan-container")
      .then(function (response) {
        setTypeList(response.data);
      })
      .catch(function (error) {});
  }, []);

  return (
    <Box sx={{ width: 450 }}>
      <ToggleButtonGroup
        color="primary"
        value={containerType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {typeList.map((value, index) => (
          <ToggleButton key={index} value={value} aria-label="disposable">
            {value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export default SelectContainer;
