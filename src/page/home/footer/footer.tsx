import "./footer.scss";
import youtube from "../../../assets/image/YouTube_full-color_icon_(2017).svg";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const [t, _i18n] = useTranslation();
  const youtubeClick = () => {
    window.open("https://www.youtube.com/channel/UCEi3IVCuOUNHjqTBeOhzBRQ");
  };

  const companyPage = () => {
    window.open("https://www.medsyslab.co.kr");
  };

  return (
    <div className="wrap">
      <div className="column">
        <div className="row">
          <div>{t("MSL Inc.")}</div>
          <div className="siteMap">
            <div className="youtube" onClick={youtubeClick}>
              <img src={youtube} className="youtubeIcon" />
            </div>
            <div className="companyPage">
              <a onClick={companyPage} className="companyName">
                <Typography>MSLWEB</Typography>
              </a>
            </div>
          </div>
        </div>
        <div className="service-info">
          <div>
            <Typography className="adressText">{t("Corp Ceo Info")}</Typography>
            <Typography className="adressText">{t("Corp Address")}</Typography>
          </div>
        </div>
        <p className="copyright">
          Copyright © 2022 Medical System Laboratory. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
