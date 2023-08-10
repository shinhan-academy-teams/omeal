import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SignInState } from "../../recoil/SignInState";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

function PayInfo(props) {
  // 회원 아이디
  const memberId = useRecoilValue(SignInState);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    axios
      .get("/mypage/payment-info", {
        params: { memId: memberId },
      })
      .then(function (response) {
        setPaymentHistory(response.data);
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
        <Typography variant="h4">결제내역</Typography>
        <TableContainer>
          <Table size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>결제일시</StyledTableCell>
                <StyledTableCell>결제금액</StyledTableCell>
                <StyledTableCell>구독시작일</StyledTableCell>
                <StyledTableCell>구독종료일</StyledTableCell>
                <StyledTableCell>구독상태</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {moment(history.date).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>{history.amount.toLocaleString()} 원</TableCell>
                  <TableCell>{history.startDate}</TableCell>
                  <TableCell>{history.endDate}</TableCell>
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

export default PayInfo;
