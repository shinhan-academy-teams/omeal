import React from "react";
import SignUpComp from "../../component/members/SignUpComp";
// import img11 from "../../assets/img/test.png";
// import { Box } from "@mui/system";

function SignUp(props) {
  return (
    <>
      <div className="App">
        <div className="wrapper">
          <div className="contentWrapper">
            <SignUpComp />
            {/* <Box sx={{ backgroundColor: "black" }}>
              <img src={img11} alt="img" />
            </Box> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
