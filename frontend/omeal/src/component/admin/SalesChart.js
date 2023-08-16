import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "../common/CircularProgress";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart(props) {
  let now_year = new Date().getFullYear();
  const [isLoadingMonth, setLoadingMonth] = useState(true);
  const [isLoadingWeek, setLoadingWeek] = useState(true);
  const [year, setYear] = useState(now_year);
  const [month, setMonth] = useState([]);
  const [week, setWeek] = useState([]);

  const makeYearList = () => {
    return Array.from({ length: 101 }, (_, index) => index + 2000);
  };

  const years = makeYearList();

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const getPaymentData = () => {
    axios({
      url: "/admin/total-sales",
      method: "GET",
      params: { year: year },
    })
      .then((res) => {
        console.log(res.data);
        const monthly = res.data["monthly"];
        const weekly = res.data["weekly"];
        setMonth(monthly);
        setWeek(weekly);
        setLoadingMonth(false);
        setLoadingWeek(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  const weekData = {
    labels: week.map((m) => m["dateInfo"]),
    datasets: [
      {
        label: "주차별 매출",
        data: week.map((m) => m["totalSales"]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const monthData = {
    labels: month.map((m) => m["dateInfo"]),
    datasets: [
      {
        label: "년도-월 매출",
        data: month.map((m) => m["totalSales"]),
        borderColor: "#EA5C2B",
        backgroundColor: "#EA5C2B",
      },
    ],
  };

  return (
    <div>
      <div>
        <FormControl
          sx={{
            width: "100px",
            paddingRight: "10px",
            margin: "20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <InputLabel id="select-search-label">년도</InputLabel>
          <Select
            labelId="search-condition-label"
            id="search-condition"
            value={year}
            label="search"
            onChange={handleYearChange}
          >
            {years.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            size="sm"
            onClick={() => {
              getPaymentData();
            }}
          >
            조회
          </Button>
        </FormControl>
      </div>
      <h1>월별 매출</h1>
      {isLoadingMonth && <CircularProgress />}
      {isLoadingMonth ? (
        <CircularProgress />
      ) : month.length > 0 ? (
        <Line data={monthData} />
      ) : (
        <h2>데이터 없음</h2>
      )}
      <h1>주별 매출</h1>
      {isLoadingWeek && <CircularProgress />}
      {isLoadingWeek ? (
        <CircularProgress />
      ) : week.length > 0 ? (
        <Line data={weekData} />
      ) : (
        <h2>데이터 없음</h2>
      )}
    </div>
  );
}

export default SalesChart;
