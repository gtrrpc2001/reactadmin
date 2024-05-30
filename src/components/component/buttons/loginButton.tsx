type Props = {
  HandleLogin: () => Promise<void>;
  notAllow: boolean;
  errorTxt: string;
};

export const LoginButton = ({ HandleLogin, notAllow, errorTxt }: Props) => {
  return (
    <div>
      <button
        onClick={HandleLogin}
        disabled={!notAllow}
        className="loginButton"
      >
        로그인
      </button>
      <div className="errorMessageWrap">
        <div>{errorTxt}</div>
      </div>
    </div>
  );
};
