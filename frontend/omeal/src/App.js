import "./App.css";
import Header from "./component/Header";
import Bottom from "./component/Bottom";
//import SignUp from "./component/SignUp";
import Container from "@mui/system/Container";
//import SubInfo from "./component/SubInfo";
import Mypage from "./component/Mypage";

function App() {
  return (
    <Container maxWidth="sm" disableGutters>
      <div className="App">
        <div className="wrapper">
          <Header></Header>
          <div className="contentWrapper">
            <Mypage></Mypage>
          </div>
          <Bottom></Bottom>
        </div>
      </div>
    </Container>
  );
}

export default App;
