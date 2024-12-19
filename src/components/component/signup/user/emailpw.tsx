import { ReactNode, useEffect, useRef, useState } from "react";
import { email_regex, pwd_regex } from "../../login/login";
import { Login_TextFeild } from "../../login/Login_components/login_textfield";

interface signupPage1Props {
  email: string;
  pw1: string;
  pw2: string;
  handleEmail: React.ChangeEventHandler<HTMLInputElement>;
  handlePassword1: React.ChangeEventHandler<HTMLInputElement>;
  handlePassword2: React.ChangeEventHandler<HTMLInputElement>;
  handlePrevButton: React.MouseEventHandler<HTMLButtonElement>;
  handleNextButton: React.MouseEventHandler<HTMLButtonElement>;
}

export const SignUpEmailPw = (Props: signupPage1Props) => {
  const [emailHelperText, setEmailHelperText] = useState<ReactNode>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const isEmailValid = useRef<boolean>(false);

  const [pw1HelperText, setPw1HelperText] = useState<ReactNode>();
  const [pw1Error, setPw1Error] = useState<boolean>(false);
  const isPw1Valid = useRef<boolean>(false);

  const [pw2HelperText] = useState<string>("");
  const [pw2Error] = useState<boolean>(false);
  const isPw2Equal = useRef<boolean>(false);

  // const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    validateEmail(Props.email);
  }, [Props.email]);

  useEffect(() => {
    validatePassword(Props.pw1);
  }, [Props.pw1]);

  useEffect(() => {
    isPasswordEqual(Props.pw1, Props.pw2);
  }, [Props.pw2]);

  useEffect(() => {
    if (isEmailValid.current && isPw1Valid.current && isPw2Equal.current) {
      // setButtonDisabled(false);
    } else {
      // setButtonDisabled(true);
    }
  }, [isEmailValid.current, isPw1Valid.current, isPw2Equal.current]);

  const setEmailValidateFun = (
    error: boolean,
    value: React.SetStateAction<ReactNode>
  ) => {
    setEmailError(error);
    setEmailHelperText(value);
  };

  const setPwValidateFun = (
    error: boolean,
    value: React.SetStateAction<ReactNode>
  ) => {
    setPw1Error(error);
    setPw1HelperText(value);
  };

  const setPw2ValidateFun = (
    error: boolean,
    value: React.SetStateAction<ReactNode>,
    refValue: boolean
  ) => {
    isPw2Equal.current = refValue;
    setPw1Error(error);
    setPw1HelperText(value);
  };

  const validateEmail = (email: string) => {
    if (email.length == 0) {
      isEmailValid.current = false;
      setEmailValidateFun(false, "");
    } else {
      const test_result = email_regex.test(email);
      isEmailValid.current = test_result;
      if (test_result) {
        setEmailValidateFun(false, "");
      } else {
        setEmailValidateFun(true, "올바른 이메일을 입력해주세요.");
      }
    }
  };

  const validatePassword = (password: string) => {
    if (password.length == 0) {
      isPw1Valid.current = false;
      setPwValidateFun(false, "");
    } else {
      const test_result = pwd_regex.test(password);
      isPw1Valid.current = test_result;
      if (test_result) {
        setPwValidateFun(false, "");
      } else {
        setPwValidateFun(
          true,
          <>
            올바른 비밀번호 형식을 입력하세요 <br />
            (8자 이상, 1개 이상의 숫자 및 특수문자 포함)
          </>
        );
      }
    }
  };

  const isPasswordEqual = (pw1: string, pw2: string) => {
    if (pw2.length == 0) {
      setPw2ValidateFun(false, "", false);
    } else {
      if (pw1 === pw2) {
        setPw2ValidateFun(false, "", true);
      } else {
        setPw2ValidateFun(true, "비밀번호가 서로 다릅니다", false);
      }
    }
  };

  return (
    <>
      <Login_TextFeild
        id="email"
        fullWidth={true}
        className="signupInput"
        type=""
        label="이메일"
        value={Props.email}
        onChange={Props.handleEmail}
        error={emailError}
        helperText={emailHelperText}
        placeholder=""
      />

      <Login_TextFeild
        id="pw1"
        fullWidth={true}
        className="signupInput"
        type="password"
        label="비밀번호"
        value={Props.pw1}
        onChange={Props.handlePassword1}
        error={pw1Error}
        helperText={pw1HelperText}
        placeholder=""
      />

      <Login_TextFeild
        id="pw2"
        fullWidth={true}
        className="signupInput"
        type="password"
        label="비밀번호 확인"
        value={Props.pw2}
        onChange={Props.handlePassword2}
        error={pw2Error}
        helperText={pw2HelperText}
        placeholder=""
      />
    </>
  );
};
