import { Grid2, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLoginContext } from "../../hooks/context/login_context";
import { useTranslation } from "react-i18next";

export const Login_Tab_Button = () => {
  const [t, _i18n] = useTranslation();
  const { userType, handleUserType } = useLoginContext();
  return (
    <Grid2 size={12} className="GridRow-center">
      <ToggleButtonGroup
        value={userType}
        exclusive
        onChange={(_e, type) => handleUserType(type)}
      >
        <ToggleButton className="UserTypeSelect" value={"일반"}>
          {t("Regular")}
        </ToggleButton>
        <ToggleButton className="UserTypeSelect" value={"보호자"}>
          {t("Guardian")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};
