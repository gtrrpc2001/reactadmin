import { Button, Grid } from "@mui/material";
import AppleLogin from "react-apple-login";

export const AppleLoginButton = () => {
  return (
    <Grid item xs={12} className="GridRow-center">
      <div className="AppleLoginWraper">
        <div className="AppleLoginButton">
          <AppleLogin
            clientId="YOUR_CLIENT_ID"
            redirectURI="YOUR_REDIRECT_URL"
            designProp={{
              width: 200,
              height: 35,
              locale: "ko_KR",
            }}
          />
        </div>
      </div>
    </Grid>
  );
};
