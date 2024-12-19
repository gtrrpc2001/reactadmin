import "./footer.scss";
import youtube from "../../../assets/image/YouTube_full-color_icon_(2017).svg";
import { Typography } from "@mui/material";

type Props = {
  language: boolean;
};

export const Footer = ({ language }: Props) => {
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
          {language ? <div>(주)엠에스엘</div> : <div>MSL Inc.</div>}
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
          {language ? (
            <div>
              <Typography className="adressText">
                대표 : 정연호, 최상동 | 사업자등록번호 : 423-87-00640 | 대표전화
                : 042-936-2017
              </Typography>
              <Typography className="adressText">
                대전광역시 유성구 학하로 159번길 12, 319호 (복용동, 한밭대학교
                지역협력관)
              </Typography>
            </div>
          ) : (
            <div>
              <Typography className="adressText">
                CEO : Yeunho Joung, Sangdong Choi | Tel : +82-42-936-2017
              </Typography>
              <Typography className="adressText">
                no.319, 12, Hakha-ro 159beon-gil, Yuseong-gu, Daejeon, Republic
                of Korea
              </Typography>
            </div>
          )}
        </div>
        <p className="copyright">
          Copyright © 2022 Medical System Laboratory. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
