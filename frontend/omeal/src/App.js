import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import {
  LinearProgress,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import NavBar from "./pages/common/NavBar";
import NoNavBar from "./pages/common/NoNavBar";
import Main from "./pages/Main";
import TodayMeal from "./pages/todayMeal/TodayMeal";
import CardRegister from "./pages/members/CardRegister";
import SignIn from "./pages/members/SignIn";
import SignUp from "./pages/members/SignUp";
import Container from "@mui/system/Container";
import Subscription from "./component/subscription/Subscription";
import Mypage from "./component/mypage/Mypage";
import CardInfo from "./component/mypage/CardInfo";
import SubInfo from "./component/mypage/SubInfo";
import UserInfo from "./component/mypage/UserInfo";
import SandralPark from "./component/community/SandralPark";
import BibimLab from "./component/community/BibimLab";
import RiceSoupMinistry from "./component/community/RiceSoupMinistry";
import GreenZone from "./component/community/GreenZone";
import NoodleOffice from "./component/community/NoodleOffice";
import KoreaTown from "./component/community/KoreaTown";
import Register from "./component/community/Register";
import OmealLand from "./component/community/OmealLand";
import Feedback from "./pages/todayMeal/Feedback";
import Worldcup from "./pages/worldcup/Worldcup";
import PostView from "./component/community/PostView";
import DeliveryInfo from "./component/mypage/DeliveryInfo";
import PayInfo from "component/mypage/PayInfo";
import Notice from "component/common/Notice";
import FAQ from "component/common/FAQ";
import { useRecoilValue } from "recoil";
import {
  MemberRoleState,
  SignInState,
  SubCheckState,
} from "./recoil/SignInState";
import AdminMeun from "pages/admin/AdminMenu";
import ManageMember from "pages/admin/ManageMember";
import ManageDishes from "pages/admin/ManageDishes";
import ManageSales from "pages/admin/ManageSales";
import AdminNavBar from "pages/common/AdminNavBar";
import JSConfetti from "js-confetti";
import { useState } from "react";
import { useEffect } from "react";
import splash from "./assets/img/logo/splash.png";
export const jsConfetti = new JSConfetti();

const App = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  // 프로젝트 폰트, 메인 컬러 등
  const theme = createTheme({
    palette: {
      primary: {
        main: "#EA5C2B",
        light: "#FF7F3F",
      },
    },
    typography: {
      fontFamily: "GmarketSansMedium",
    },
  });

  const isLogin = useRecoilValue(SignInState) === "" ? false : true;
  const isSub = useRecoilValue(SubCheckState);
  const isAdmin = useRecoilValue(MemberRoleState) === "ADMIN" ? true : false;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" disableGutters>
        {loading ? (
          <Paper
            elevation={17}
            sx={{
              boxSizing: "border-box",
              margin: "16px auto",
              height: "95vh",
              width: "95%",
              backgroundColor: "#FEF7ED",
              backgroundImage: `url("${splash}")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LinearProgress
              sx={{
                mt: "100%",
                width: "70%",
                height: "17px",
                borderRadius: "12px",
              }}
            />
          </Paper>
        ) : (
          <Routes location={location}>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Main />} />
              <Route path="notice" element={<Notice />} />
              <Route path="faq" element={<FAQ />} />

              {/* 구독신청 */}
              <Route
                path="subscription"
                element={
                  isSub ? (
                    <Navigate replace to="/mypage/sub-info" />
                  ) : (
                    <Subscription />
                  )
                }
              />

              {/* 마이페이지 */}
              <Route path="mypage">
                <Route
                  path=""
                  element={
                    isLogin ? (
                      <Mypage />
                    ) : (
                      <Navigate replace to="/auth/sign-in" />
                    )
                  }
                />
                <Route path="card-info" element={<CardInfo />} />
                <Route path="sub-info" element={<SubInfo />} />
                <Route path="user-info" element={<UserInfo />} />
                <Route path="delivery-info" element={<DeliveryInfo />} />
                <Route path="payment-info" element={<PayInfo />} />
              </Route>

              {/* 커뮤니티 */}
              <Route path="omealland" element={<OmealLand />} />
              <Route path="omealland/sandwich" element={<SandralPark />} />
              <Route path="omealland/bibimbap" element={<BibimLab />} />
              <Route path="omealland/ricesoup" element={<RiceSoupMinistry />} />
              <Route path="omealland/salad" element={<GreenZone />} />
              <Route path="omealland/noodle" element={<NoodleOffice />} />
              <Route path="omealland/homemeal" element={<KoreaTown />} />
              <Route path="omealland/register" element={<Register />} />
              <Route path="omealland/PostView/:no" element={<PostView />} />

              {/* 오늘의밀 */}
              <Route path="today-meal">
                <Route
                  path=""
                  element={
                    isLogin ? (
                      <TodayMeal />
                    ) : (
                      <Navigate replace to="/auth/sign-in" />
                    )
                  }
                />
                <Route path="feedback" element={<Feedback />} />
              </Route>

              <Route path="food-worldcup" element={<Worldcup />} />
            </Route>

            {/* 회원가입 및 로그인 */}
            <Route path="/auth" element={<NoNavBar />}>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="card-register" element={<CardRegister />} />
            </Route>

            {/* 관리자 페이지 */}
            <Route path="manage">
              <Route
                path=""
                element={isAdmin ? <AdminMeun /> : <Navigate replace to="/" />}
              />
              <Route path="member" element={<ManageMember />} />
              <Route path="dishes" element={<ManageDishes />} />
              <Route path="sales" element={<ManageSales />} />
            </Route>
        </Routes>

      </Container>
    </ThemeProvider>
  );
};

export default App;
