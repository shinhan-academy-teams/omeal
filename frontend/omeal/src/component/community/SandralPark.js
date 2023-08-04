import {
  Box,
  Button,
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
  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = (chipValue) => {
    console.log(chipValue);
  };

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
        <Stack spacing={3} alignItems="center" sx={{ marginTop: "10px" }}>
          <Stack direction="row" spacing={1}>
            {[
              "자유게시판",
              "질문/답변",
              "오늘의 밀",
              "맛집 추천",
              "인기글",
            ].map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleClick(chip);
                }}
              />
            ))}
          </Stack>
          <Stack direction="column"></Stack>
        </Stack>
        {/* 테이블 */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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
