import { Login_Info_Button } from "./login_Info_Button";
import { useLoginContext } from "../../hooks/context/login_context";

export const Login_Info = () => {
  const { userType, setExitParams } = useLoginContext();
  return (
    <div className="linkWraper">
      <Login_Info_Button
        type={userType}
        text="회원가입"
        setExitAnimation={setExitParams}
      />

      <Login_Info_Button
        type={userType}
        text="이메일 및 비밀번호 찾기"
        setExitAnimation={setExitParams}
      />
    </div>
  );
};
