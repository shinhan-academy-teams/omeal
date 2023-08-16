import React, { useState, useEffect } from "react";
import CircularProgress from "../common/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const likeColumns = [
  { field: "menuNo", headerName: "음식 번호", width: 80 },
  { field: "menuName", headerName: "음식 이름", width: 200 },
  { field: "count", headerName: "좋아요", width: 70 },
];

const dislikeColumns = [
  { field: "menuNo", headerName: "음식 번호", width: 80 },
  { field: "menuName", headerName: "음식 이름", width: 200 },
  { field: "count", headerName: "싫어요", width: 70 },
];

function FeedbackList(props) {
  const [isLoadingLike, setLoadingLike] = useState(true);
  const [isLoadingDislike, setLoadingDislike] = useState(true);
  const [likeData, setLikeData] = useState([]);
  const [dislikeData, setDislikeData] = useState([]);

  useEffect(() => {
    axios({
      url: "/admin/feedback-result",
      method: "GET",
    })
      .then((res) => {
        const like = res.data["like"];
        const dislike = res.data["dislike"];
        setLikeData(like);
        setLoadingLike(false);
        setDislikeData(dislike);
        setLoadingDislike(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>좋아요 Top 5</h1>
      <div>
        {isLoadingLike && <CircularProgress />}
        {!isLoadingLike && (
          <DataGrid
            rows={likeData}
            getRowId={(row) => row.menuNo}
            columns={likeColumns}
            pageSize={5}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        )}
      </div>
      <hr />
      <h1>싫어요 Top 5</h1>
      <div>
        {isLoadingDislike && <CircularProgress />}
        {!isLoadingDislike && (
          <DataGrid
            rows={dislikeData}
            getRowId={(row) => row.menuNo}
            columns={dislikeColumns}
            pageSize={5}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default FeedbackList;
