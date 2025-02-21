import { Button, Grid2 } from "@mui/material";
import { useLoginContext } from "../../hooks/context/login_context";
import { useTranslation } from "react-i18next";

type Props = {
  disabled: boolean;
};

export const Login_Button = ({ disabled }: Props) => {
  const [t, _i18n] = useTranslation();
  const { page } = useLoginContext();
  return (
    <Grid2 size={12} className="GridRow-center">
      <div className={page == 1 ? "loginButtonWraper" : "CorpButtonWraper"}>
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="contained"
          className="loginButton"
          type="submit"
          disabled={disabled}
        >
          {t("Sign In")}
        </Button>
      </div>
    </Grid2>
  );
};
