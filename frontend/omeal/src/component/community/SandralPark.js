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
  const [searchCategory, setSearchCategory] = useState("");
  const [postList, setPostList] = useState([]);
  const [search, setSearch] = useState("");

  const navi = useNavigate();
  const boardReg = () =>{
    navi("/omealland/register");
  }

  //처음 전체 게시물
  useEffect(() => {
    axios
      .get("/board/샌드럴파크", { townname: "샌드럴파크" })
      .then((res) => {
        setPostList(res.data.map((data) => data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  ////검색
  //검색 카테고리
  const handleChange = (event) => {
    setSearchCategory(event.target.value);
  };

  //검색창
  const changeSearchHandle = (event) => {
    setSearch(event.target.value);
  };

  //검색버튼
  const searchSubmit = () => {
    if (searchCategory === "title") {
      //제목 검색
      axios({
        method: "get",
        url: "/board/샌드럴파크/title",
        params: { townname: "샌드럴파크", title: search },
      })
        .then((res) => {
          setPostList(res.data.map((data) => data));
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else if (searchCategory === "content") {
      //내용 검색
      console.log("내용", search);
      axios({
        method: "get",
        url: "/board/샌드럴파크/content",
        params: { townname: "샌드럴파크", content: search },
      })
        .then((res) => {
          setPostList(res.data.map((data) => data));
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else if (searchCategory === "writer") {
      //작성자 검색
      axios({
        method: "get",
        url: "/board/샌드럴파크/nick-name",
        params: { townname: "샌드럴파크", nickname: search },
      })
        .then((res) => {
          setPostList(res.data.map((data) => data));
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      //검색카테고리 전체, 검색
    }
  };

  // 게시물 카테고리
  const [selectedOption, setSelectedOption] = useState("");

  const changeOption = (value) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    if (selectedOption === "") return;
    axios({
      method: "get",
      url: "/board/샌드럴파크/" + selectedOption,
      params: { townname: "샌드럴파크", category: selectedOption },
    })
      .then((res) => {
        setPostList(res.data.map((data) => data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [selectedOption]);

  const radioOptions = [
    {
      value: "자유게시판",
      label: "자유게시판",
    },
    {
      value: "QnA",
      label: "질문/답변",
    },
    {
      value: "오늘의밀",
      label: "오늘의 밀",
    },
    {
      value: "맛집추천",
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
            value={searchCategory}
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
          onChange={changeSearchHandle}
        />
        <Button
          variant="contained"
          sx={{ height: "55px", marginLeft: "10px" }}
          onClick={searchSubmit}
        >
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
        <div className="tableScroll">
          <TableContainer component={Card}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#FEF7ED" }}>
                <TableRow>
                <TableCell>번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center">작성자</TableCell>
                  <TableCell align="center">작성일</TableCell>
                  <TableCell align="center" style={{ width: 42 }}>
                    조회수
                  </TableCell>
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
                    <TableCell align="center">{post.title}</TableCell>
                    <TableCell align="center">
                      {post.member.memberNick}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(post.regDate).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell align="center">{post.hits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Button variant="contained" onClick={boardReg}>
          글 작성
        </Button>
      </Box>
    </div>
  );
}

export default SandralPark;