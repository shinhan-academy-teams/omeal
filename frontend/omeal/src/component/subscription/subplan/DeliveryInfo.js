import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  AddrAtom,
  DoorPwdAtom,
  SubAddrAtom,
} from "../../../recoil/SubscriptionState";

function DeliveryInfo(props) {
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState("");

  // 필수로 입력해야 하는 정보(doorPwd, addr, subAddr)에 대해선 Recoil로 관리해서 유효성검사 했음
  const [doorPwd, setDoorPwd] = useRecoilState(DoorPwdAtom);
  const [addr, setAddr] = useRecoilState(AddrAtom);
  const [subAddr, setSubAddr] = useRecoilState(SubAddrAtom);

  const handleChange1 = (event) => {
    setAddr(event.target.value);
  };

  const handleChang2 = (event) => {
    setSubAddr(event.target.value);
  };

  const handleChange3 = (event) => {
    setDoorPwd(event.target.value);
  };

  const requestChange = (event) => {
    setRequest(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 2,
          width: "450px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="주소"
        variant="outlined"
        value={addr}
        onChange={handleChange1}
      />
      <TextField
        id="outlined-basic"
        label="상세 주소"
        variant="outlined"
        value={subAddr}
        onChange={handleChang2}
      />

      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{ display: "flex" }}
        >
          공동현관 출입 여부
        </FormLabel>
        <ToggleButtonGroup
          style={{ marginBottom: 15 }}
          color="primary"
          exclusive
          value={doorPwd}
          onChange={handleChange3}
          aria-label="text alignment"
        >
          <ToggleButton
            style={{ width: "100%" }}
            value="yesPwd"
            aria-label="yesPwd"
            onClick={() => setShow(true)}
          >
            비밀번호
          </ToggleButton>
          <ToggleButton
            style={{ width: "100%" }}
            value="noPwd"
            aria-label="noPwd"
            onClick={() => setShow(false)}
          >
            자율출입가능
          </ToggleButton>
        </ToggleButtonGroup>
        {show && (
          <TextField id="outlined-basic" label="비밀번호" variant="outlined" />
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
