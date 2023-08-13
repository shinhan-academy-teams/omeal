import { Box, TextField } from "@mui/material";
import axios from "axios";
import SmallCircularProgress from "component/common/SmallCircularProgress";
import React, { useEffect, useState } from "react";

function ReceiveInfo(props) {
  const [memberInfo, setMemberInfo] = useState({});

  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/mypage/user-info", {
        params: { memId: props.memberId },
      })
      .then(function (response) {
        setMemberInfo({
          받는사람: response.data.memberName,
          연락처: response.data.memberTel,
        });
        setIsLoading(false);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      {isLoading === true && <SmallCircularProgress />}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "450px" },
        }}
        noValidate
        autoComplete="off"
      >
        {Object.keys(memberInfo).map((key) => (
          <TextField
            key={key}
            id="outlined-basic"
            label={key}
            variant="outlined"
            defaultValue={memberInfo[key]}
          />
        ))}
      </Box>
    </>
  );
}

export default ReceiveInfo;
