import {
  Box,
  Button,
  Input,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import moment from "moment/moment";
import { useRecoilValue } from "recoil";
import { MemberNickState } from "../../recoil/SignInState";

function PostView() {
  const { no } = useParams();
  const regMemberNick = useRecoilValue(MemberNickState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [memberNick, setMemberNick] = useState("");
  const [regDate, setRegDate] = useState("");
  const [list, setList] = useState([]);
  const [reply, setReply] = useState("");

  const handleInputChange = (e) => {
    setReply(e.target.value);
  };

  useEffect(() => {

    axios({
      method: "get",
      url: `/board/content`,
      params: {
        postNo: no,
      },
    })
      .then((res) => {
        const dto = res.data;
        console.log(dto);
        setTitle(dto.title);
        setContent(dto.content);
        setMemberNick(dto.memberNick);
        setRegDate(dto.regDate);
        setList(dto.commentsList);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const btnClick = (e) => {
    axios({
      method: "post",
      url: "/reply/register",
      data: JSON.stringify({
        boardNo: no,
        memberNick: regMemberNick,
        content: reply,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Box
        className="tableScroll"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          width: 450,
          height: 600,
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} margin={2}>
          <Item>{title}</Item>
          <Item sx={{ height: 400 }}>{content}</Item>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center">내용</TableCell>
                <TableCell align="center" sx={{ width: "22%" }}>
                  작성자
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  작성일자
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow>
                  <TableCell>{row.content}</TableCell>
                  <TableCell>{row.memberNick}</TableCell>
                  <TableCell>
                    {new Date(row.regDate).toISOString().split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <Input
              sx={{ width: "80%" }}
              placeholder="댓글을 입력해주세요"
              onChange={handleInputChange}
            ></Input>
            <Button
              sx={{ width: 20, marginLeft: 2 }}
              variant="contained"
              onClick={btnClick}
            >
              등록
            </Button>
          </div>
        </Stack>
      </Box>
    </>
  );
}

export default PostView;
