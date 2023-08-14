import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function FeedbackList(props) {
  const [likekData, setLikeData] = useState([]);
  const [dislikekData, setDislikeData] = useState([]);

  useEffect(() => {
    axios({
      url: "/admin/feedback-result",
      method: "GET",
    })
      .then((res) => {
        setLikeData(res.data["like"]);
        setDislikeData(res.data["dislike"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>좋아요 Top 5</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">음식 이름</TableCell>
                <TableCell align="center">좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {likekData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.menuName}
                  </TableCell>
                  <TableCell align="center">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <hr />
      <h1>싫어요 Top 5</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">음식 이름</TableCell>
                <TableCell align="center">싫어요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dislikekData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.menuName}
                  </TableCell>
                  <TableCell align="center">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default FeedbackList;
