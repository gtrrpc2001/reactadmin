import { Button, Grid } from "@mui/material";

type Props = {
  disabled: boolean;
  page: number;
};

export const Login_Button = ({ disabled, page }: Props) => {
  return (
    <Grid item xs={12} className="GridRow-center">
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
    </Grid>
  );
};
