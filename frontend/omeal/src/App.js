import "./App.css";
import Header from "./component/Header";
import Bottom from "./component/Bottom";
//import SubInfo from "./component/SubInfo";
// import Card from "./component/Card";
// import UserInfo from "./component/UserInfo";
// import CardInfo from "./component/CardInfo";
// import SignIn from "./component/SignIn";
import Container from "@mui/system/Container";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/members/SignUp";

const App = () => {
  const location = useLocation();

  return (
    <Container maxWidth="sm" disableGutters>
      {/* <div className="App">
        <div className="wrapper">
          <Header></Header>
          <div className="contentWrapper">
            <body>contents</body>
            <SignUp></SignUp>
          </div>
          <Bottom></Bottom>
        </div>
      </div> */}
      <Routes location={location}>
        <Route path="/auth/sign-up" element={<SignUp />} />
      </Routes>
    </Container>
  );
};

export default App;
