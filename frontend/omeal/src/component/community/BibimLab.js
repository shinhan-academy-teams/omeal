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

function BibimLab(props) {
  const [postList, setPostList] = useState([]);
  const [searchCategory, setSearchCategory] = useState(""); //검색 조건
  const [search, setSearch] = useState(""); //검색내용
  const [selectedOption, setSelectedOption] = useState(""); //옵션

  const navi = useNavigate();
  const boardReg = () => {
    navi("/omealland/register");
  };

  //처음 전체 게시물
  useEffect(() => {
    axios
      .get("/board/비빔연구소", { townname: "비빔연구소" })
      .then((res) => {
        setPostList(res.data.map((data) => data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  //검색조건
  const handleChange = (event) => {
    setSearchCategory(event.target.value);
  };

  //검색창
  const changeSearchHandle = (event) => {
    setSearch(event.target.value);
  };

  //검색 옵션
  const changeOption = (value) => {
    setSelectedOption(value);
  };

  ////검색 버튼 클릭시
  const searchSubmit = () => {
    //검색 옵션 있을때
    if (selectedOption) {
      if (searchCategory === "") {
        //옵션O, 카테고리X
        axios({
          method: "get",
          url: `/board/비빔연구소/${selectedOption}/10`,
        })
          .then((res) => {
            setPostList(res.data.map((data) => data));
          })
          .catch((err) => {
            console.log("error", err);
          });
      } else {
        //제목, 내용, 작성자별
        axios({
          method: "get",
          url: "/board/비빔연구소/" + selectedOption + "/" + searchCategory,
          params: {
            topic: search,
          },
        })
          .then((res) => {
            setPostList(res.data.map((data) => data));
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    } else {
      //검색 옵션 선택 안했을때 ok
      axios({
        method: "get",
        url: "/board/비빔연구소/" + searchCategory,
        params: {
          townname: "비빔연구소",
          category: searchCategory,
          topic: search,
        },
      })
        .then((res) => {
          setPostList(res.data.map((data) => data));
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  //검색 버튼 클릭 안하고 옵션만 변경할때
  useEffect(() => {
    //카테고리 선택 전
    if (selectedOption === "") return;

    //카테고리 선택 후, 옵션적용
    if (searchCategory.length > 0 && selectedOption) {
      axios({
        method: "get",
        url: "/board/비빔연구소/" + selectedOption + "/" + searchCategory,
        params: {
          topic: search,
        },
      })
        .then((res) => {
          setPostList(res.data.map((data) => data));
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      //옵션만 바뀌고 검색 안했을때
      axios({
        method: "get",
        url: `/board/비빔연구소/${selectedOption}/10`,
      })
        .then((res) => {
          setPostList(res.data.map((data) => data));
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
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
      {/* 비빔연구소 */}
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
            <MenuItem value={"nick-name"}>작성자</MenuItem>
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

export default BibimLab;
