import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Login_TextFeild } from "../login/Login_components/login_textfield";
import { KeepButton } from "./component/keepButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LastPage } from "./component/lastpage";

export interface findAccountChild {
  setExitParams: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
}

export const FindEmail = ({ setExitParams }: findAccountChild) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function handleFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneName(e.target.value);
  }

  useEffect(() => {
    if (firstName == "" || lastName == "" || phone == "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [firstName, lastName, phone]);

  const clickHandler = () => {
    setPageNumber(2);
  };

  const pages: { [key: number]: JSX.Element } = {
    1: (
      <>
        <Grid2 size={12} className="GridRow-center">
          <Typography className="FindPwInfoText">
            등록된 계정의 정보를 입력해 주십시오.
          </Typography>
        </Grid2>
        <Login_TextFeild
          id="name"
          className="findPwEmailInput"
          label="이름"
          value={firstName}
          onChange={handleFirstName}
          type="text"
        />

        <Login_TextFeild
          id="surname"
          className="findPwEmailInput"
          label="성"
          value={lastName}
          onChange={handleLastName}
          type="text"
        />

        <Login_TextFeild
          id="phone"
          className="findPwEmailInput"
          label="핸드폰 번호"
          value={phone}
          onChange={handlePhone}
          type="tel"
          placeholder="-를 빼고 입력하세요"
        />
        <KeepButton onClick={clickHandler} disabled={buttonDisabled} />
      </>
    ),
    2: (
      <LastPage
        onClick={() => {
          setExitParams({ opacity: 0, x: 100 });
          navigate("/");
        }}
        text={
          "인증이 완료 되었습니다. 처음 화면으로 돌아가 로그인 해주시기 바랍니다."
        }
        className=""
      />
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {pages[pageNumber]}
    </motion.div>
  );
};
