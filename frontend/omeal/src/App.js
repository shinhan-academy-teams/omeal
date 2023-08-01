import "./App.css";
import { useMediaQuery } from "react-responsive";
import Header from "./component/Header";
import Bottom from "./component/Bottom";
//import SubInfo from "./component/SubInfo";
// import Card from "./component/Card";
// import UserInfo from "./component/UserInfo";
// import CardInfo from "./component/CardInfo";
// import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Container from "@mui/system/Container";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

function App() {
  return (
    <Container maxWidth="sm" disableGutters>
      <div className="App">
        <div className="wrapper">
          <Header></Header>
          <div className="contentWrapper">
            <body>contents</body>
            <SignUp></SignUp>
          </div>
          <Bottom></Bottom>
        </div>
      </div>
    </Container>
  );
}

export default App;
