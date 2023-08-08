import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";

function DeliveryInfo(props) {
  // 회원 아이디
  const memberId = useRecoilValue(SignInState);
  const [deliveryHistory, setDeliveryHistory] = useState([]);

  useEffect(() => {
    axios
      .get("/mypage/delivery-info", {
        params: { memId: memberId },
      })
      .then(function (response) {
        console.log(response.data);
        setDeliveryHistory(response.data);
      })
      .catch(function (error) {});
  }, []);
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: "100%",
          height: "100%",
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">배송내역</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>배송일시</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>메뉴</TableCell>
                <TableCell>배송현황</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.date}</TableCell>
                  <TableCell>{history.deliveryAddr}</TableCell>
                  <TableCell>{history.menu}</TableCell>
                  <TableCell>{history.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default DeliveryInfo;
