import { Login_TextFeild } from "./login_textfield";
import { Login_Tab_Button } from "./login_tab_button";
import { ReactNode } from "react";
import { useLoginContext } from "../../hooks/context/login_context";
import { useTranslation } from "react-i18next";

export interface Login_tabProps {
  emailHelperText: ReactNode;
  pwHelperText: ReactNode;
  isEmailError: boolean;
  isPwError: boolean;
}

export const Login_Tab = (props: Login_tabProps) => {
  const [t, _i18n] = useTranslation();
  const { email, pw, handleEmail, handlePw, page } = useLoginContext();
  return (
    <>
      {page == 1 && <Login_Tab_Button />}
      <Login_TextFeild
        id="email"
        className="logininput"
        error={props.isEmailError}
        value={email}
        type="text"
        placeholder="youremail@domain.com"
        onChange={handleEmail}
        label={t("Email")}
        helperText={props.emailHelperText}
        autoComplete="username"
      />
      <Login_TextFeild
        id="password"
        className="logininput"
        error={props.isPwError}
        value={pw}
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        onChange={handlePw}
        label={t("Password")}
        helperText={props.pwHelperText}
        autoComplete="current-password"
      />
    </>
  );
};
