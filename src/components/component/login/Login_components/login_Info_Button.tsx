import { Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleAnimateNext } from "../../../../func/func";
import { useTranslation } from "react-i18next";

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
  const [t, _i18n] = useTranslation();
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
    <Grid2 size={12} className="GridRow-link">
      <Button sx={{ textTransform: "none" }} onClick={() => clickHandler()}>
        {t(text)}
      </Button>
    </Grid2>
  );
};
