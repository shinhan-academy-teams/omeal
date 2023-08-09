import React from "react";
import omealland from "../../assets/img/omalland.png";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OmealLand(props) {
  const navi = useNavigate();

  const handleClick = (value) => {
    navi("/omealland/" + value);
  };

  return (
    <div className="top">
      <Box
        component="form"
        sx={{
          width: 600,
          height: 740,
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <img
          src={omealland}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          alt="오밀랜드"
        />
        <button
          name="test"
          type="button"
          onClick={() => {
            handleClick("sandwich");
          }}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "fixed",
            top: "18%",
            left: "39%",
            opacity: 0,
          }}
        ></button>
        <button
          name="test"
          type="button"
          onClick={() => {
            handleClick("bibimbap");
          }}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "fixed",
            top: "18%",
            left: "54%",
            opacity: 0,
          }}
        ></button>
        <button
          name="test"
          type="button"
          onClick={() => {
            handleClick("ricesoup");
          }}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "fixed",
            top: "47%",
            left: "31.8%",
            opacity: 0,
          }}
        ></button>
        <button
          name="test"
          type="button"
          onClick={() => {
            handleClick("salad");
          }}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "fixed",
            top: "47%",
            left: "61.2%",
            opacity: 0,
          }}
        ></button>
        <button
          name="test"
          type="button"
          onClick={() => {
            handleClick("noodle");
          }}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "fixed",
            top: "77%",
            left: "39%",
            opacity: 0,
          }}
        ></button>
        <button
          name="test"
          type="button"
          onClick={() => {
            handleClick("homemeal");
          }}
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            position: "fixed",
            top: "77%",
            left: "53.8%",
            opacity: 0,
          }}
        ></button>
      </Box>
    </div>
  );
}

export default OmealLand;
