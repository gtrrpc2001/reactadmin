import { Button, Grid2 } from "@mui/material";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleImage from "../../../assets/image/g-logo.png";
import { useTranslation } from "react-i18next";

// const clientId = "ClientID";

export const GoogleLoginButton = () => {
  const [t, _i18n] = useTranslation();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        console.log("User Info:", userInfo.data);
      } catch (error) {
        console.error("Error fetching User Info:", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <Button
      onClick={() => googleLogin()}
      variant="outlined"
      className="GoogleLoginButton"
      sx={{ textTransform: "none" }}
    >
      <img
        src={googleImage}
        alt="Google Logo"
        style={{
          height: "20px",
          marginRight: "8px",
          verticalAlign: "middle",
        }}
      />
      {t("Sign in With Google")}
    </Button>
  );
};

export const GoogleProvider = () => {
  return (
    <Grid2 size={12} className="GridRow-center">
      <div className="googleLoginWraper">
        <GoogleOAuthProvider clientId="213123">
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </Grid2>
  );
};
