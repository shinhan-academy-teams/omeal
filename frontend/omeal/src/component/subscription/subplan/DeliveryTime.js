import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SubTimeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";

function DeliveryTime(props) {
  const [subTime, setSubTime] = useRecoilState(SubTimeAtom);
  const [typeList, setTypeList] = useState([]);

  const handleChange = (event, newAlignment) => {
    setSubTime(newAlignment);
  };

  useEffect(() => {
    axios
      .get("/plan-time")
      .then(function (response) {
        setTypeList(response.data);
      })
      .catch(function (error) {});
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <ToggleButtonGroup
        color="primary"
        value={subTime}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {typeList.map((value, index) => (
          <ToggleButton key={index} value={value} aria-label={value}>
            {value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
    // * 아침 : 08:00 이전 / 점심 : 12:00 이전 / 저녁 : 19:00 이전에
    // 배달됩니다.
  );
}

export default DeliveryTime;
