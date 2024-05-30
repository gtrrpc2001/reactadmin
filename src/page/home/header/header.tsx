import { useNavigate } from "react-router-dom";
import "./header.scss";
import graph from "../../../assets/image/graph2.png";
import youtube from "../../../assets/image/youtube_logo2..png";

export const Header = () => {
  const navigation = useNavigate();

  const toolbarClick = () => {
    navigation("/home");
  };

  const graphClick = () => {
    navigation("/home/graph");
  };

  const youtubeClick = () => {
    window.open("https://www.youtube.com/channel/UCEi3IVCuOUNHjqTBeOhzBRQ");
  };

  const companyPage = () => {
    window.open("https://www.medsyslab.co.kr");
  };

  return (
    <div className="headerwrap">
      <div className="toolbar">
        <a onClick={toolbarClick}>
          <span>LOOKHEART</span>
        </a>
      </div>
      <div className="center">
        <div className="graph" onClick={graphClick}>
          <span>
            <img src={graph} />
          </span>
        </div>

        <div className="youtube" onClick={youtubeClick}>
          <span>
            <img src={youtube} />
          </span>
        </div>

        <div className="companyPage">
          <a onClick={companyPage}>
            <span>MSLWEB</span>
          </a>
        </div>
      </div>
    </div>
  );
};
