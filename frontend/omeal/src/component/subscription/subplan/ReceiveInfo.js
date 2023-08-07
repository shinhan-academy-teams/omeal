import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ReceiveInfo(props) {
  const [memberInfo, setMemberInfo] = useState({});

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
      })
      .catch(function (error) {});
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "450px" },
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
  );
}

export default ReceiveInfo;
