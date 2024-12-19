import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { email_regex } from "../login/login";
import { Login_TextFeild } from "../login/Login_components/login_textfield";
import { findAccountChild } from "./FindEmail";
import { KeepButton } from "./component/keepButton";
import { motion } from "framer-motion";
import { LastPage } from "./component/lastpage";

export const FindPW = ({ setExitParams }: findAccountChild) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setButtonDisabled(!isEmailValid(email));
  }, [email]);

  function isEmailValid(email: string) {
    return email_regex.test(email);
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  const clickHandler = () => {
    setPageNumber(2);
  };

  const pages: { [key: number]: JSX.Element } = {
    1: (
      <>
        <Grid2 size={12} className="GridRow-center">
          <Typography className="FindPwInfoText">
            등록된 이메일 계정을 입력해주세요. 비밀번호 재설정 링크를
            보내드리겠습니다.
          </Typography>
        </Grid2>
        <Login_TextFeild
          id="email"
          className="findPwEmailInput"
          label="이메일"
          value={email}
          onChange={handleEmail}
          type="text"
          placeholder="youremail@domain.com"
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
          "귀하의 이메일 계정으로 비밀번호 초기화 링크를 보냈습니다. 비밀번호 초기화 후 다시 로그인 하시기 바랍니다."
        }
        className="ConfirmInfoText"
      />
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {pages[pageNumber]}
    </motion.div>
  );
};
