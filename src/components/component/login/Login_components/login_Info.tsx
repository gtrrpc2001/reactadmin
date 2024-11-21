import { Login_Info_Button } from "./login_Info_Button";

type Props = {
  userType: "일반" | "보호자" | "기업";
  setExitAnimation: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
};

export const Login_Info = ({ userType, setExitAnimation }: Props) => {
  return (
    <div className="linkWraper">
      <Login_Info_Button
        type={userType}
        text="회원가입"
        setExitAnimation={setExitAnimation}
      />

      <Login_Info_Button
        type={userType}
        text="이메일 및 비밀번호 찾기"
        setExitAnimation={setExitAnimation}
      />
    </div>
  );
};
