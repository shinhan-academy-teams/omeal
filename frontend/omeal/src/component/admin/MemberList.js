import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import CircularProgress from "../common/CircularProgress";

const columns = [
  { field: "memberId", headerName: "아이디", width: 180 },
  { field: "memberName", headerName: "이름", width: 70 },
  { field: "memberNick", headerName: "닉네임", width: 100 },
  {
    field: "memberRole",
    headerName: "Role",
    width: 80,
  },
];

function MemberList(props) {
  const [rows, setRow] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const roleHandler = (e) => {
    if (e.row.memberRole === "ADMIN") {
      Swal.fire({
        icon: "warning",
        text: "이미 관리자 입니다 일반 유저로 변경사겠습니까?",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
        confirmButtonText: "유저 변경", // confirm 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면

          axios({
            url: "/admin/change-admin",
            method: "put",
            data: e.row,
          })
            .then((res) => {
              if (res.data === true) {
                Swal.fire(
                  "변경이 완료되었습니다.",
                  "화끈하시네요~!",
                  "success"
                );
                window.location.reload();
              } else {
                Swal.fire("변경이 취소되었습니다.", "아쉽네요~!", "fail");
              }
            })
            .catch((err) => {
              console.log(err);
              Swal.fire("변경이 취소되었습니다.", "아쉽네요~!", "fail");
            });
        }
      });
      return;
    } else if (e.row.memberRole === "USER") {
      Swal.fire({
        icon: "warning",
        text: "일반 유저를 관리자로 변경사겠습니까??.",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
        confirmButtonText: "관리자 변경", // confirm 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          axios({
            url: "/admin/change-user",
            method: "put",
            data: e.row,
          })
            .then((res) => {
              if (res.data === true) {
                Swal.fire(
                  "변경이 완료되었습니다.",
                  "화끈하시네요~!",
                  "success"
                );
                window.location.reload();
              } else {
                Swal.fire("변경이 취소되었습니다.", "아쉽네요~!", "fail");
              }
            })
            .catch((err) => {
              console.log(err);
              Swal.fire("변경이 취소되었습니다.", "아쉽네요~!", "fail");
            });
        }
      });
      return;
    }
  };

  useEffect(() => {
    axios({
      url: "/admin/mem-list",
      method: "GET",
    })
      .then((res) => {
        const date = res.data;
        setRow(date);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: 660, width: "100%" }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <DataGrid
          rows={rows}
          getRowId={(row) => row.memberId}
          columns={columns}
          pageSize={10}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onCellClick={(row) => {
            roleHandler(row);
          }}
        />
      )}
    </div>
  );
}

export default MemberList;
