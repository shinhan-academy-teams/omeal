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

  // 게시글&댓글 읽어오기
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
        setTitle(dto.title);
        setContent(dto.content);
        setMemberNick(dto.memberNick);
        setRegDate(dto.regDate);
        setList(dto.commentsList);

        //사진 있을때
        if (dto.photo) {
          const photo = (
            "https://omeal-jomeal.s3.ap-northeast-2.amazonaws.com/" + dto.photo
          ).replace("@", "");

          setPhoto(photo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reply]);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  // 댓글 작성
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
        setReply("");
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
          width: 600,
          height: 830,
          backgroundColor: "#fef7ed",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} margin={2}>
          <Item>{title}</Item>
          <Item sx={{ height: 300 }}>{content}</Item>
          <Item sx={{ textAlign: "center" }}>
            <img
              style={{ width: 500, height: 500 }}
              src={`${photo}`}
              alt="사진없음"
            ></img>
          </Item>
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
              value={reply}
              onChange={handleInputChange}
            />
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
