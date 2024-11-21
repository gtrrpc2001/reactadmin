import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props = {
  userType: "일반" | "보호자" | "기업";
  handleUserType: (type: "일반" | "보호자" | "기업") => void;
};

export const Login_Tab_Button = (props: Props) => {
  return (
    <Grid item xs={12} className="GridRow-center">
      <ToggleButtonGroup
        value={props.userType}
        exclusive
        onChange={(e, type) => props.handleUserType(type)}
      >
        <ToggleButton className="UserTypeSelect" value={"일반"}>
          일반
        </ToggleButton>
        <ToggleButton className="UserTypeSelect" value={"보호자"}>
          보호자
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
};
