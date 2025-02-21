import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import AppleLogin from "react-apple-login";
import { useTranslation } from "react-i18next";

export const AppleLoginButton = () => {
  const [_t, i18n] = useTranslation();
  const [language, setLanguage] = useState<string>();

  useEffect(() => {
    console.log(i18n.language);
    console.log(language);
    setLanguage(i18n.language == "ko" ? "ko_KR" : "en_US");
  }, [i18n.language]);

  return (
    <Grid2 size={12} className="GridRow-center">
      <div className="AppleLoginWraper">
        <div className="AppleLoginButton">
          <AppleLogin
            clientId="YOUR_CLIENT_ID"
            redirectURI="YOUR_REDIRECT_URL"
            designProp={{
              width: 200,
              height: 35,
              locale: language,
            }}
          />
        </div>
      </div>
    </Grid2>
  );
};
