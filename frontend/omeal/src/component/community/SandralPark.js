import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
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
import { useNavigate } from "react-router-dom";

function SandralPark(props) {
  const [search, setSearch] = useState("");
  const [postList, setPostList] = useState([]);

  const navi = useNavigate();
  const boardReg = () => {
    navi("/omealland/register");
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
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

  // 토글
  const [selectedOption, setSelectedOption] = useState("");

  const changeOption = (value) => {
    setSelectedOption(value);
    console.log(selectedOption);
  };
  const radioOptions = [
    {
      value: "자유게시판",
      label: "자유게시판",
    },
    {
      value: "질문/답변",
      label: "질문/답변",
    },
    {
      value: "오늘의 밀",
      label: "오늘의 밀",
    },
    {
      value: "맛집 추천",
      label: "맛집 추천",
    },
    {
      value: "인기글",
      label: "인기글",
    },
  ];

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

        {/* 토글버튼 */}
        <FormControl
          sx={{
            p: "5px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {radioOptions.map((radioOption) => {
              return (
                <FormControlLabel
                  value={radioOption.value}
                  key={radioOption.value}
                  control={
                    <Chip
                      color="primary"
                      label={radioOption.label}
                      variant={
                        selectedOption === radioOption.value
                          ? "filled"
                          : "outlined"
                      }
                      sx={{ m: "5px" }}
                      onClick={() => changeOption(radioOption.value)}
                    />
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>

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
        <Button variant="contained" onClick={boardReg}>
          글 작성
        </Button>
      </Box>
    </div>
  );
}

export default SandralPark;
