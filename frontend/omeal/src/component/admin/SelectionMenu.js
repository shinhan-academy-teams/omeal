import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SelectionMenu(props) {
  const navi = useNavigate();

  return (
    <div>
      <h1>관리자 페이지</h1>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navi("member");
        }}
      >
        회원 관리
      </Button>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navi("dishes");
        }}
      >
        메뉴 관리
      </Button>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navi("sales");
        }}
      >
        매출 관리
      </Button>
    </div>
  );
}

export default SelectionMenu;
