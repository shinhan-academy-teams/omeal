import "./App.css";
import Container from "@mui/system/Container";
import { Route, Routes, useLocation } from "react-router-dom";
// import SubInfo from "./component/SubInfo";
// import Card from "./component/Card";
// import UserInfo from "./component/UserInfo";
// import CardInfo from "./component/CardInfo";
// import SignIn from "./component/SignIn";
// import CardInfo from "./component/CardInfo";
import SignUp from "./pages/members/SignUp";
import CardRegister from "./pages/members/CardRegister";
import NavBar from "./pages/common/NavBar";
import NoNavBar from "./pages/common/NoNavBar";
import Main from "./pages/Main";
import SignIn from "./component/SignIn";

const App = () => {
  const location = useLocation();

  return (
    <Container maxWidth="sm" disableGutters>
      <Routes location={location}>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Main />} />
        </Route>

        <Route path="/auth" element={<NoNavBar />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="card-register" element={<CardRegister />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
