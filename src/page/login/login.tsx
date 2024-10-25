import "./login.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  eqActions,
  loginActions,
} from "../../components/createslice/createslices";
import { AppDispatch } from "../../store/store";
import { saveLog, tryLogin } from "../../data/login";
import backgroundImage from "../../assets/image/KakaoTalk_20231012_172515024.png";
import logo2Image from "../../assets/image/logo2.png";
import { LoginImg } from "../../components/component/image/loginBackgroundImg";
import { LoginLogo } from "../../components/component/image/loginlogoImg";
import { LoginEmailError } from "../../components/component/inputs/login/loginEmailError";
import { LoginPwdError } from "../../components/component/inputs/login/loginPwdError";
import { LoginButton } from "../../components/component/buttons/loginButton";
import { LoginInput } from "../../components/component/inputs/login/loginInput";
import { setWindowLoginItems } from "../../func/func";

const LoginPage = () => {
  const AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pw, setPw] = useState("");
  const [pwError, setpwError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [notAllow, setNotAllow] = useState(Boolean);
  const [errorTxt, seterror] = useState("");
  const [lastEmail, setLastEmail] = useState("");
  const [lastpw, setLastpw] = useState("");
  const pwdRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (email != lastEmail || pw != lastpw) seterror("");
    emailChecked();
    pwChecked();
    setNotAllow(
      (emailValid && pw.length > 7) ||
        (email == `${process.env.REACT_APP_ADMIN}` &&
          pw == `${process.env.REACT_APP_ADMIN}`) ||
        (email == `${process.env.REACT_APP_BUSINESS}` &&
          pw == `${process.env.REACT_APP_BUSINESS}`)
    );
  }, [email, pw]);

  function emailChecked() {
    setEmailValid(email.includes("@") && email.includes("."));
    setEmailError(
      emailValid && email.length > 0 ? "" : "올바른 이메일을 입력해주세요."
    );
  }

  function pwChecked() {
    setpwError(pw.length < 8 ? "8자 이상 입력해주세요." : "");
  }

  function errorCode(txt: string) {
    seterror("");
    seterror(txt);
  }

  const onEmailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e: any) => {
    setPw(e.target.value);
  };

  const setHandleLogin = async () => {
    errorCode("아이디 & 비밀번호를 체크 중 입니다.");
    setLastEmail(email);
    setLastpw(pw);
    const loginBool = await tryLogin(email, pw);
    await SuccessLogin(loginBool);
    if (!loginBool) errorCode("이메일,비밀번호가 틀렸습니다.");
  };

  const HandleLogin = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (notAllow) {
      if (e?.currentTarget.id == "password") {
        if (e?.key === "Enter") setHandleLogin();
      } else {
        setHandleLogin();
      }
    }
  };

  const SuccessLogin = async (loginBool: boolean) => {
    AppDispatch(eqActions.eq(email));
    AppDispatch(loginActions.loginCheck(loginBool));
    let logBool = false;

    if (loginBool) logBool = await saveLog(email, "로그인");

    if (logBool) {
      navigate("/home");
    }
  };

  const logoClick = () => navigate("/");

  const emailEnter = () => {
    pwdRef.current?.focus();
  };
  const emailClick = () => {
    emailRef.current?.focus();
  };

  return (
    <div className="background">
      <LoginImg className="backgroudImg" backgroundImage={backgroundImage} />
      <div className="login">
        <div style={{ justifyContent: "center" }}>
          <LoginLogo logo={logo2Image} logoClick={logoClick} />
          <div className="contentWrap">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                HandleLogin();
              }}
            >
              <div className="inputTitle">이메일 주소</div>

              <LoginInput
                id="email"
                className="inputWrapEmail"
                onClick={emailClick}
                inputClassName="inputEmail"
                type="text"
                inputRef={emailRef}
                placeholder="test@gmail.com"
                value={email}
                onKeypress={emailEnter}
                onHandler={onEmailHandler}
              />

              <LoginEmailError
                emailValid={emailValid}
                email={email}
                emailError={emailError}
              />

              <div style={{ marginTop: "26px" }} className="inputTitle">
                비밀번호
              </div>

              <LoginInput
                id="password"
                className="inputWrap"
                onClick={emailEnter}
                inputClassName="inputPw"
                type="password"
                inputRef={pwdRef}
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={pw}
                onKeypress={(e) => HandleLogin(e)}
                onHandler={onPasswordHandler}
              />

              <LoginPwdError pw={pw} pwError={pwError} />

              <LoginButton
                HandleLogin={HandleLogin}
                notAllow={notAllow}
                errorTxt={errorTxt}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
