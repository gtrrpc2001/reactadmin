import { Grid2, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLoginContext } from "../../hooks/context/login_context";

export const Login_Tab_Button = () => {
  const { userType, handleUserType } = useLoginContext();
  return (
    <Grid2 size={12} className="GridRow-center">
      <ToggleButtonGroup
        value={userType}
        exclusive
        onChange={(_e, type) => handleUserType(type)}
      >
        <ToggleButton className="UserTypeSelect" value={"일반"}>
          일반
        </ToggleButton>
        <ToggleButton className="UserTypeSelect" value={"보호자"}>
          보호자
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};
