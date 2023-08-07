import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function SandralPark(props) {
  const [search, setSearch] = useState("");
  const [postList, setPostList] = useState([]);

  // const [freeBoard, setFreeBoard] = useState(false);
  // const [qna, setQna] = useState(false);
  // const [todayMeal, setTodayMeal] = useState(false);
  // const [famous, setFamous] = useState(false);
  // const [popular, setPopular] = useState(false);

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = (chipValue) => {
    console.log(chipValue);
  };

  useEffect(() => {
    axios
      .get("/board/샌드럴파크", { townName: "샌드럴파크" })
      .then((res) => {
        console.log(res.data);
        setPostList(res.data.map((data) => data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div>
      {/* 샌드럴파크 */}
      <Box sx={{ width: "500px" }}>
        <FormControl sx={{ width: "100px", paddingRight: "10px" }}>
          <InputLabel id="select-search-label">검색조건</InputLabel>
          <Select
            labelId="search-condition-label"
            id="search-condition"
            value={search}
            label="search"
            onChange={handleChange}
          >
            <MenuItem value={"title"}>제목</MenuItem>
            <MenuItem value={"content"}>내용</MenuItem>
            <MenuItem value={"writer"}>작성자</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="search-input"
          label=""
          variant="outlined"
          sx={{ width: "300px" }}
        />
        <Button variant="contained" sx={{ height: "55px", marginLeft: "10px" }}>
          <SearchIcon />
        </Button>
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              label="자유게시판"
              color="primary"
              variant="primary"
              onClick={() => {
                handleClick("자유게시판");
              }}
            />
            <Chip
              label="질문/답변"
              color="primary"
              variant="outlined"
              onClick={() => {
                handleClick("질문/답변");
              }}
            />
            <Chip
              label="오늘의 밀"
              color="primary"
              variant="outlined"
              onClick={() => {
                handleClick("오늘의 밀");
              }}
            />
            <Chip
              label="맛집 추천"
              color="primary"
              variant="outlined"
              onClick={() => {
                handleClick("맛집 추천");
              }}
            />
            <Chip
              label="인기글"
              color="primary"
              variant="outlined"
              onClick={() => {
                handleClick("인기글");
              }}
            />
          </Stack>
        </Stack>
        {/* 테이블 */}
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FEF7ED" }}>
                <TableCell>인덱스</TableCell>
                <TableCell align="right">제목</TableCell>
                <TableCell align="right">작성자</TableCell>
                <TableCell align="right">작성일</TableCell>
                <TableCell align="right">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postList.map((post) => (
                <TableRow
                  key={post.postNo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {post.postNo}
                  </TableCell>
                  <TableCell align="right">{post.title}</TableCell>
                  <TableCell align="right">{post.member.memberNick}</TableCell>
                  <TableCell align="right">
                    {new Date(post.regDate).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell align="right">{post.hits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          href="/omealland/register"
          sx={{ marginTop: "30px" }}
        >
          글 작성
        </Button>
      </Box>
    </div>
  );
}

export default SandralPark;
