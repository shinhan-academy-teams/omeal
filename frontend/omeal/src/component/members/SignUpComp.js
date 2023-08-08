import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

function SignUpComp(props) {
  const navi = useNavigate();

  const emailRegex =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/;
  const telRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

  const [idRegexBool, setIdRegexBool] = useState(true);
  const [idAvailable, setIdAvailable] = useState(false);

  const [pwdRegexBool, setPwdRegexBool] = useState(true);
  const [memberPwdConfirm, setMemberPwdConfirm] = useState("");
  const [samePwd, setSamePwd] = useState(true);

  const [nickAvailable, setNickAvailable] = useState(false);

  const [telRegexBool, setTelRegexBool] = useState(true);

  const [allInputFilled, setAllInputFilled] = useState(false);

  const [buttonActive, setButtonActive] = useState(false);

  const [member, setMember] = useState({
    memberId: "",
    memberPwd: "",
    memberName: "",
    memberNick: "",
    memberTel: "",
    memberAddr: "",
  });

  // 입력되면 멤버 정보로 셋팅
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  // 이메일 정규식
  const isEmailRegex = (e) => {
    setIdRegexBool(emailRegex.test(e.target.value));
  };

  // 이메일 중복 체크
  const checkIdDup = () => {
    if (member.memberId && idRegexBool) {
      axios({
        url: "sign-up/id-check",
        method: "get",
        params: { memberId: member.memberId },
      })
        .then((response) => {
          setIdAvailable(response.data > 0 ? true : false);
          if (response.data === -1) {
            alert("해당 이메일은 이미 사용중입니다.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 비밀번호 정규식
  const isPwdRegex = (e) => {
    setPwdRegexBool(passRegex.test(e.target.value));
  };

  // 비밀번호 확인 (두번째 input)
  const handlePwd2 = (e) => {
    setMemberPwdConfirm(e.target.value);
  };

  // 비밀번호와 비밀번호 확인이 같은지 체크
  useEffect(() => {
    setSamePwd(member.memberPwd === memberPwdConfirm ? true : false);
  }, [member.memberPwd, memberPwdConfirm]);

  // 닉네임 중복 체크
  const checkNickDup = () => {
    if (member.memberNick) {
      axios({
        url: "sign-up/nick-check",
        method: "get",
        params: { memberNick: member.memberNick },
      })
        .then((response) => {
          setNickAvailable(response.data > 0 ? true : false);
          if (response.data === -1) {
            alert("해당 닉네임은 이미 사용중입니다.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 핸드폰 번호 정규식
  const isTelRegex = (e) => {
    setTelRegexBool(telRegex.test(e.target.value));
  };

  // 모든 입력창이 입력됐는지
  useEffect(() => {
    if (
      member.memberId &&
      member.memberPwd &&
      member.memberName &&
      member.memberNick &&
      member.memberTel &&
      member.memberAddr
    ) {
      setAllInputFilled(true);
    } else {
      setAllInputFilled(false);
    }
  }, [member]);

  // 회원가입 버튼 활성화
  useEffect(() => {
    if (
      idRegexBool &&
      idAvailable &&
      pwdRegexBool &&
      samePwd &&
      nickAvailable &&
      telRegexBool &&
      allInputFilled
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [
    idRegexBool,
    idAvailable,
    pwdRegexBool,
    samePwd,
    nickAvailable,
    telRegexBool,
    allInputFilled,
  ]);

  // 카드 등록으로 이동
  const next = () => {
    navi("/auth/card-register", { state: member });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#FEF7ED",
        }}
      >
        <Typography variant="h4" component="h4">
          SIGN UP
        </Typography>
        <Grid container spacing={2} my={2} sx={{ width: "60%" }}>
          <Grid item xs>
            <TextField
              label="이메일"
              required
              fullWidth
              type="email"
              id="memberId"
              name="memberId"
              value={member.memberId}
              onChange={(e) => {
                setIdAvailable(false);
                handleChange(e);
                isEmailRegex(e);
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box mr={2}>
              <Tooltip title="중복 체크" arrow placement="top">
                <IconButton aria-label="checkIdDup" onClick={checkIdDup}>
                  {idAvailable ? (
                    <CheckCircleIcon sx={{ fontSize: 32, color: "olive" }} />
                  ) : (
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 32, color: "black" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          {idRegexBool ? (
            ""
          ) : (
            <Grid item xs={12} mt={-1}>
              <Typography
                variant="body2"
                component="p"
                pl={1}
                sx={{ textAlign: "left", fontSize: "13px" }}
              >
                이메일 형식을 맞춰주세요
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="비밀번호"
              required
              fullWidth
              type="password"
              id="memberPwd"
              name="memberPwd"
              value={member.memberPwd}
              onChange={(e) => {
                handleChange(e);
                isPwdRegex(e);
              }}
            />
          </Grid>
          {pwdRegexBool ? (
            ""
          ) : (
            <Grid item xs={12} mt={-1}>
              <Typography
                variant="body2"
                component="p"
                pl={1}
                sx={{ textAlign: "left", fontSize: "13px" }}
              >
                영문과 숫자를 포함하여 6 ~ 20자리 입력해주세요
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="비밀번호 확인"
              required
              fullWidth
              type="password"
              id="memberPwdCheck"
              name="memberPwdCheck"
              onChange={handlePwd2}
            />
          </Grid>
          {samePwd ? (
            ""
          ) : (
            <Grid item xs={12} mt={-1}>
              <Typography
                variant="body2"
                component="p"
                pl={1}
                sx={{ textAlign: "left", fontSize: "13px" }}
              >
                동일한 비밀번호를 입력해주세요
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="이름"
              required
              fullWidth
              type="text"
              id="memberName"
              name="memberName"
              value={member.memberName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="닉네임"
              required
              fullWidth
              type="text"
              id="memberNick"
              name="memberNick"
              value={member.memberNick}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box mr={2}>
              <Tooltip title="중복 체크" arrow placement="top">
                <IconButton aria-label="checkNickDup" onClick={checkNickDup}>
                  {nickAvailable ? (
                    <CheckCircleIcon sx={{ fontSize: 32, color: "olive" }} />
                  ) : (
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 32, color: "black" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="핸드폰 번호"
              required
              fullWidth
              type="tel"
              id="memberTel"
              name="memberTel"
              value={member.memberTel}
              placeholder="010-1234-5678"
              onChange={(e) => {
                handleChange(e);
                isTelRegex(e);
              }}
            />
          </Grid>
          {telRegexBool ? (
            ""
          ) : (
            <Grid item xs={12} mt={-1}>
              <Typography
                variant="body2"
                component="p"
                pl={1}
                sx={{ textAlign: "left", fontSize: "13px" }}
              >
                핸드폰 번호 형식을 맞춰주세요
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="주소"
              required
              fullWidth
              type="text"
              id="memberAddr"
              name="memberAddr"
              value={member.memberAddr}
              placeholder="서울시 중구 남대문로10길 29"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          sx={{ mt: 3 }}
          type="button"
          variant="outlined"
          onClick={next}
          disabled={!buttonActive}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default SignUpComp;
