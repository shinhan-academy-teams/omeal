import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./pages/common/NavBar";
import NoNavBar from "./pages/common/NoNavBar";
import Main from "./pages/Main";
import CardRegister from "./pages/members/CardRegister";
import SignUp from "./pages/members/SignUp";
import Container from "@mui/system/Container";
import Subscription from "./component/subscription/Subscription";
import { ThemeProvider, createTheme } from "@mui/material";
import SignIn from "./component/SignIn";

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

  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" disableGutters>
        <Routes location={location}>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Main />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>
          <Route path="/auth" element={<NoNavBar />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="card-register" element={<CardRegister />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};
export default App;
