import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SubTypeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";

function DeliveryCycle(props) {
  const [subType, setSubType] = useRecoilState(SubTypeAtom);
  const [typeList, setTypeList] = useState({});

  const handleChange = (event, newAlignment) => {
    setSubType(newAlignment);
  };

  useEffect(() => {
    axios
      .get("/plan-subtype")
      .then(function (response) {
        setTypeList({
          주간구독: response.data[0],
          월간구독: response.data[1],
        });
      })
      .catch(function (error) {});
  }, []);

  return (
    <Box sx={{ width: 450 }}>
      <ToggleButtonGroup
        color="primary"
        value={subType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {Object.keys(typeList).map((key) => (
          <ToggleButton
            key={key}
            value={typeList[key]}
            aria-label={typeList[key]}
          >
            {key}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export default DeliveryCycle;
