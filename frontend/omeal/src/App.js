import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
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
import { useRecoilValue } from "recoil";
import { SignInState } from "./recoil/SignInState";

const App = () => {
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

  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" disableGutters>
        <Routes location={location}>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Main />} />

            <Route path="subscription" element={<Subscription />} />
              
            <Route
              path="mypage"
              element={
                isLogin ? <Mypage /> : <Navigate replace to="/auth/sign-in" />
              }
            />
            <Route
              path="card-info"
              element={
                isLogin ? <CardInfo /> : <Navigate replace to="/auth/sign-in" />
              }
            />
            <Route
              path="sub-info"
              element={
                isLogin ? <SubInfo /> : <Navigate replace to="/auth/sign-in" />
              }
            />
            <Route
              path="user-info"
              element={
                isLogin ? <UserInfo /> : <Navigate replace to="/auth/sign-in" />
              }
            />
            <Route
              path="delivery-info"
              element={
                isLogin ? (
                  <DeliveryInfo />
                ) : (
                  <Navigate replace to="/auth/sign-in" />
                )
              }
            />

            {/* 커뮤니티 */}
            <Route path="omealland" element={<OmealLand />} />
            <Route path="omealland/sandwich" element={<SandralPark />} />

            <Route
              path="omealland/sandwich/PostView/:no"
              element={<PostView />}
            />

            <Route path="omealland/bibimbap" element={<BibimLab />} />
            <Route path="omealland/ricesoup" element={<RiceSoupMinistry />} />
            <Route path="omealland/salad" element={<GreenZone />} />
            <Route path="omealland/noodle" element={<NoodleOffice />} />
            <Route path="omealland/homemeal" element={<KoreaTown />} />
            <Route path="omealland/register" element={<Register />} />

            <Route
              path="today-meal"
              element={
                isLogin ? (
                  <TodayMeal />
                ) : (
                  <Navigate replace to="/auth/sign-in" />
                )
              }
            />
            <Route
              path="today-meal/feedback"
              element={
                isLogin ? <Feedback /> : <Navigate replace to="/auth/sign-in" />
              }
            />

            <Route path="food-worldcup" element={<Worldcup />} />
          </Route>

          <Route path="/auth" element={<NoNavBar />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="card-register" element={<CardRegister />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};
export default App;
