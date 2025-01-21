import { Button, Grid2 } from "@mui/material";
import { useLoginContext } from "../../hooks/context/login_context";

type Props = {
  disabled: boolean;
};

export const Login_Button = ({ disabled }: Props) => {
  const { page } = useLoginContext();
  return (
    <Grid2 size={12} className="GridRow-center">
      <div className={page == 1 ? "loginButtonWraper" : "CorpButtonWraper"}>
        <Button
          variant="contained"
          className="loginButton"
          type="submit"
          disabled={disabled}
        >
          로그인
        </Button>
      </div>
    </Grid2>
  );
};
