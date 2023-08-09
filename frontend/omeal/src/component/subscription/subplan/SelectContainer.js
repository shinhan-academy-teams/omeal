import { Box, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ContainerTypeAtom } from "../../../recoil/SubscriptionState";
import axios from "axios";
import multiUseContainer from "../../../assets/img/subscription/multi_use_container.png";
import disposableContainer from "../../../assets/img/subscription/disposable_container.png";

function SelectContainer(props) {
  const [containerType, setContainerType] = useRecoilState(ContainerTypeAtom);
  const [typeList, setTypeList] = useState([]);

  const handleChange = (event, newAlignment) => {
    setContainerType(newAlignment);
  };

  const imgStyle = {
    width: "100%",
    borderRadius: "20px",
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
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ToggleButtonGroup
            color="primary"
            value={containerType}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            style={{ flexGrow: 1 }}
          >
            {typeList.map((value, index) => (
              <ToggleButton
                key={index}
                value={value}
                aria-label="disposable"
                style={{ flexGrow: 1 }}
              >
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <img alt="" src={multiUseContainer} style={imgStyle}></img>
        </Grid>
        <Grid item xs={5}>
          <img alt="" src={disposableContainer} style={imgStyle}></img>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
}

export default SelectContainer;
