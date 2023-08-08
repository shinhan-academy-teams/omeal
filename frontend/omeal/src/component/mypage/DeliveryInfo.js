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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

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
          <Table size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>배송일시</StyledTableCell>
                <StyledTableCell>주소</StyledTableCell>
                <StyledTableCell>메뉴</StyledTableCell>
                <StyledTableCell>배송현황</StyledTableCell>
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
