import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";

function DeliveryInfo(props) {
  const [doorPwd, setDoorPwd] = useState("");
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState("");

  const handleChange = (event) => {
    setDoorPwd(event.target.value);
  };

  const requestChange = (event) => {
    setRequest(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "450px" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="주소" variant="outlined" />
      <TextField id="outlined-basic" label="세부주소" variant="outlined" />

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          공동현관 출입 여부
        </FormLabel>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={doorPwd}
          onChange={handleChange}
          aria-label="text alignment"
        >
          <ToggleButton
            value="yesPwd"
            aria-label="yesPwd"
            onClick={() => setShow(true)}
          >
            비밀번호
          </ToggleButton>
          <ToggleButton
            value="noPwd"
            aria-label="noPwd"
            onClick={() => setShow(false)}
          >
            자율출입가능
          </ToggleButton>
        </ToggleButtonGroup>
        {show && (
          <div id="divshow" style={{ display: "block" }}>
            <TextField
              id="outlined-basic"
              label="비밀번호"
              variant="outlined"
            />
          </div>
        )}
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          배송 요청 사항(선택)
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={request}
          label="Age"
          onChange={requestChange}
        >
          <MenuItem value={0}>직접입력</MenuItem>
          <MenuItem value={1}>배송 전, 연락주세요.</MenuItem>
          <MenuItem value={2}>문앞에 놓고 가주세요.</MenuItem>
          <MenuItem value={3}>문앞에 놓고 연락주세요.</MenuItem>
          <MenuItem value={4}>도착하면 연락주세요.</MenuItem>
        </Select>
        {request === 0 && (
          <div id="divshow" style={{ display: "block" }}>
            <TextField
              id="outlined-basic"
              label="배송 요청 사항을 입력하세요"
              variant="outlined"
            />
          </div>
        )}
      </FormControl>
    </Box>
  );
}

export default DeliveryInfo;
