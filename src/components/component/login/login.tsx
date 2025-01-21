import { Grid2 } from "@mui/material";
import { GoogleProvider } from "../buttons/google_login_button";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { eqActions, loginActions } from "../../createslice/createslices";
import { AppDispatch } from "../../../store/store";
import { AppleLoginButton } from "../buttons/appleLoginButton";
import { saveLog, tryLogin } from "../../../data/login";
import { useDispatch } from "react-redux";
import { Login_Tab } from "./Login_components/login_tab";
import { Login_Info } from "./Login_components/login_Info";
import { Login_Button } from "./Login_components/login_Button";
import { useLoginContext } from "../hooks/context/login_context";

export const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const pwd_regex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const Login = () => {
  const navigate = useNavigate();
  const AppDispatch = useDispatch<AppDispatch>();
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<ReactNode>(<></>);
  const emailValid = useRef<boolean>(false);
  const { email, pw, page } = useLoginContext();
  const [isPwError, setIsPwError] = useState<boolean>(false);
  const [pwHelperText, setPwHelperText] = useState<ReactNode>(<></>);
  const pwValid = useRef<boolean>(false);

  // const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const admin = import.meta.env.VITE_API_ADMIN;
  const business = import.meta.env.VITE_API_BUSINESS;
  const business2 = import.meta.env.VITE_API_BUSINESS2;

  useEffect(() => {
    // 이메일 이펙트 실행
    if (email.length != 0) {
      if (isEmailValid(email)) {
        setIsEmailError(false);
        setEmailHelperText(<></>);
        emailValid.current = true;
      } else {
        setIsEmailError(true);
        setEmailHelperText(<>올바른 이메일을 입력해주세요</>);
        emailValid.current = false;
      }
    } else {
      setIsEmailError(false);
      setEmailHelperText(<></>);
      emailValid.current = false;
    }
  }, [email]);

  useEffect(() => {
    // 패스워드 이펙트 실행
    if (pw.length != 0) {
      if (isPwValid(pw)) {
        setIsPwError(false);
        setPwHelperText(<></>);
        pwValid.current = true;
      } else {
        setIsPwError(true);
        setPwHelperText(<>올바른 비밀번호를 입력해주세요</>);
        pwValid.current = false;
      }
    } else {
      setIsPwError(false);
      setPwHelperText(<></>);
      pwValid.current = false;
    }
  }, [pw]);

  useEffect(() => {
    // 버튼 이펙트 실행

    if (emailValid.current && pwValid.current) {
      // setButtonDisabled(false);
    } else {
      // setButtonDisabled(true);
    }
  }, [emailValid.current, pwValid.current]);

  const SuccessLogin = async (loginBool: boolean) => {
    AppDispatch(eqActions.eq(email));
    AppDispatch(loginActions.loginCheck(loginBool));
    let logBool = false;

    if (loginBool) logBool = await saveLog(email, "로그인");

    if (logBool) {
      navigate("/home");
    }
  };

  const checkedEmailPw = (checking: string, regex: RegExp) => {
    if (checking != admin || checking != business || checking != business2) {
      return regex.test(checking);
    } else {
      return true;
    }
  };

  function isEmailValid(email: string) {
    return checkedEmailPw(email, email_regex);
  }

  function isPwValid(password: string) {
    return checkedEmailPw(password, pwd_regex);
  }

  function handleButtonPress(_e: React.FormEvent<HTMLFormElement>) {
    // console.log({
    //   email: props.email,
    //   pw: props.pw,
    //   userType: props.userType,
    // });
  }

  async function handleLogin() {
    let loginBool = false;
    if (page == 1) {
      loginBool = await tryLogin(email, pw);
    }
    await SuccessLogin(loginBool);
  }

  return (
    <Grid2 container className="Grid-Container" sx={{ paddingTop: 3 }}>
      <form
        className="loginform"
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonPress(e);
          handleLogin();
        }}
      >
        <Login_Tab
          isPwError={isPwError}
          isEmailError={isEmailError}
          emailHelperText={emailHelperText}
          pwHelperText={pwHelperText}
        />
        <Login_Info />
        <Login_Button disabled={false} />
        {page == 1 && (
          <>
            <GoogleProvider />
            <AppleLoginButton />
          </>
        )}
      </form>
    </Grid2>
  );
};
