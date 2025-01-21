import { Typography } from "@mui/material";
import { useState } from "react";
import { Grid2 } from "@mui/material";
import "./usersignup.scss";
// import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { handleAnimatePrev, setInitialParams } from "../../../func/func";
import { SignupPages } from "../../../components/component/signup/user/userSignupPages";
import { SignUpEmailPw } from "../../../components/component/signup/user/emailpw";
import { SignUpUserInfo } from "../../../components/component/signup/user/signup_info";
import { BackButton } from "../../../components/component/findAccount/component/backButton";
import { SignUpProvider } from "../../../components/component/hooks/context/signup_context";

export const UserSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageStatus = location.state?.pageStatus || "init";
  const initialParams = setInitialParams(pageStatus);
  const [exitParams, setExitParams] = useState({ opacity: 0, x: 100 });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const maxPageNumber = 5;

  function handlePageNumberUp() {
    setPageNumber(pageNumber < maxPageNumber ? pageNumber + 1 : pageNumber);
  }

  function handlePageNumberDown() {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
  }

  function handleUserSubmit() {
    //   axios
    //     .post("/msl/api_getdata", {
    //       kind: "checkReg",
    //       eq: email,
    //       email: email,
    //       password1: pw1,
    //       // eqname: 사용자 이름,
    //       // phone: 핸드폰번호,
    //       // sex: 성별,
    //       // weight: 몸무게,
    //       // height: 키,
    //       // age: 나이
    //       // birth: 생년월일
    //     })
    //     .then((resp) => {
    //       console.log(resp);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  }

  const renderPageHandler: { [key: number]: JSX.Element } = {
    1: (
      <div className="AgreementTextField">
        <Typography>{"사용자 이용 약관"}</Typography>
      </div>
    ),
    2: <SignUpEmailPw />,
    3: <SignUpUserInfo />,
    4: <></>,
    5: (
      <Grid2 size={12} className="GridRow-center">
        <Typography>
          회원가입이 완료되었습니다. 가입 할 때의 이메일 주소로 보낸 인증 과정을
          마친 후 이용 가능합니다.
        </Typography>
      </Grid2>
    ),
  };

  const PrevButtonHandler: { [key: number]: () => void } = {
    1: () => handleAnimatePrev("/", setExitParams, navigate),
    2: () => handlePageNumberDown(),
    3: () => handlePageNumberDown(),
    4: () => handlePageNumberDown(),
  };

  const NextButtonHandler: { [key: number]: () => void } = {
    1: () => handlePageNumberUp(),
    2: () => handlePageNumberUp(),
    3: () => handlePageNumberUp(),
    4: () => {
      handleUserSubmit();
      handlePageNumberUp();
    },
    5: () => handleAnimatePrev("/", setExitParams, navigate),
  };

  return (
    <div className="Grid-Container">
      <motion.div
        initial={initialParams}
        animate={{ opacity: 1, x: 0 }}
        exit={exitParams}
        transition={{ duration: 0.5 }}
        className="SignUpWrapper"
      >
        <Grid2 container className="pageSelector">
          <BackButton url="/" setExitParams={setExitParams} />
          <Grid2 size={4} className="GridItem-center">
            <Typography className="SignUpPageNum">{pageNumber}</Typography>
            <Typography className="SignUpPageSlash">/</Typography>
            <Typography className="SignUpPageNum">{maxPageNumber}</Typography>
          </Grid2>
          <Grid2 size={4} className="GridItem-center"></Grid2>
        </Grid2>
        <form>
          <SignupPages
            pageNumber={pageNumber}
            handlePrevButton={PrevButtonHandler[pageNumber]}
            handleNextButton={NextButtonHandler[pageNumber]}
          >
            <SignUpProvider
              values={{ handlePageNumberUp, handlePageNumberDown }}
            >
              {renderPageHandler[pageNumber]}
            </SignUpProvider>
          </SignupPages>
        </form>
      </motion.div>
    </div>
  );
};
