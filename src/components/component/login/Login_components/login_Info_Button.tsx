import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleAnimateNext } from "../../../../func/func";

type Props = {
  type: "일반" | "보호자" | "기업";
  text: "회원가입" | "이메일 및 비밀번호 찾기";
  setExitAnimation: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
};

export const Login_Info_Button = ({ type, text, setExitAnimation }: Props) => {
  const navigate = useNavigate();
  const routes = {
    회원가입: {
      일반: "/signup/user",
      보호자: "/signup/parent",
      기업: "/signup/corp",
    },
    "이메일 및 비밀번호 찾기": {
      일반: "/findpw/user",
      보호자: "/findpw/parent",
      기업: "/findpw/corp",
    },
  };

  const clickHandler = () => {
    const action = routes[text];
    if (action && action[type]) {
      handleAnimateNext(action[type], setExitAnimation, navigate);
    }
  };

  return (
    <Grid item xs={12} className="GridRow-link">
      <Button onClick={() => clickHandler()}>{text}</Button>
    </Grid>
  );
};
