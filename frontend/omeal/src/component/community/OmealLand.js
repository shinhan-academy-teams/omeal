import React from "react";
import omealland from "../../assets/img/omalland.png";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OmealLand(props) {
  const navi = useNavigate();
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
            navi("/omealland/sandwich");
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
            navi("/omealland/bibimbap");
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
            navi("/omealland/ricesoup");
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
            navi("/omealland/salad");
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
            navi("/omealland/noodle");
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
            navi("/omealland/homemeal");
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
