import { Typography } from "@mui/material";
import React, { useState } from "react";
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

export const UserSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageStatus = location.state?.pageStatus || "init";
  /////////////////////////////////////////////////////////////////////////
  //                                                                     //
  // 회원가입 페이지 1                                                    //
  //                                                                     //
  /////////////////////////////////////////////////////////////////////////
  const [email, setEmail] = useState<string>("");
  const [pw1, setPw1] = useState<string>("");
  const [pw2, setPw2] = useState<string>("");
  const initialParams = setInitialParams(pageStatus);
  const [exitParams, setExitParams] = useState({ opacity: 0, x: 100 });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw1(e.target.value);
  };

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw2(e.target.value);
  };

  // const handleButton = (_e: React.MouseEvent<HTMLButtonElement>) => {
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
  // };

  /////////////////////////////////////////////////////////////////////////
  //                                                                     //
  // 회원가입 페이지 2                                                    //
  //                                                                     //
  /////////////////////////////////////////////////////////////////////////

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [birth, setBirth] = useState<string | null>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  function handleFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function handleSex(value: string) {
    setSex(value);
  }

  function handleBirth(value: string | null) {
    setBirth(value);
  }

  function handleWeight(e: React.ChangeEvent<HTMLInputElement>) {
    setWeight(e.target.value);
  }

  function handleHeight(e: React.ChangeEvent<HTMLInputElement>) {
    setHeight(e.target.value);
  }
  const [pageNumber, setPageNumber] = useState<number>(1); // 페이지 번호
  const maxPageNumber = 5;

  function handlePageNumberUp() {
    setPageNumber(pageNumber < maxPageNumber ? pageNumber + 1 : pageNumber);
  }

  function handlePageNumberDown() {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber);
  }

  function handleUserSubmit() {
    console.log({
      email: email,
      pw: pw1,
      firstName: firstName,
      lastName: lastName,
      birth: birth,
      sex: sex,
      height: height,
      weight: weight,
    });
  }

  const renderPageHandler: { [key: number]: JSX.Element } = {
    1: (
      <div className="AgreementTextField">
        <Typography>{"사용자 이용 약관"}</Typography>
      </div>
    ),
    2: (
      <SignUpEmailPw
        email={email}
        pw1={pw1}
        pw2={pw2}
        handleEmail={handleEmail}
        handlePassword1={handlePassword1}
        handlePassword2={handlePassword2}
        handlePrevButton={handlePageNumberDown}
        handleNextButton={handlePageNumberUp}
      />
    ),
    3: (
      <SignUpUserInfo
        firstName={firstName}
        lastName={lastName}
        sex={sex}
        birth={birth}
        weight={weight}
        height={height}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleSex={handleSex}
        handleBirth={handleBirth}
        handleWeight={handleWeight}
        handleHeight={handleHeight}
        handlePrevButton={handlePageNumberDown}
        handleNextButton={handlePageNumberUp}
      />
    ),
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
            {renderPageHandler[pageNumber]}
          </SignupPages>
        </form>
      </motion.div>
    </div>
  );
};
