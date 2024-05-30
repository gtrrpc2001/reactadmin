import "./footer.scss";

type Props = {
  language: boolean;
};

export const Footer = ({ language }: Props) => {
  return (
    <div className="wrap">
      <div className="row">
        {language ? <div>(주)엠에스엘</div> : <div>MSL Inc.</div>}
      </div>
      <div className="service-info">
        {language ? (
          <div>
            <span>대표 : 정연호, 최상동</span>
            <span>|</span>
            <span>사업자등록번호 : 423-87-00640</span>
            <span>대표전화 : 042-936-2017</span>
            <br />
            <span>
              대전광역시 유성구 학하로 159번길 12, 319호 (복용동, 한밭대학교
              지역협력관)
            </span>
          </div>
        ) : (
          <div>
            <span>CEO : Yeunho Joung, Sangdong Choi</span>
            <span>|</span>
            <span>Tel : +82-42-936-2017</span>
            <br />
            <span>
              no.319, 12, Hakha-ro 159beon-gil, Yuseong-gu, Daejeon, Republic of
              Korea
            </span>
          </div>
        )}
      </div>
      <p className="copyright">
        Copyright © 2022 Medical System Laboratory. All Rights Reserved.
      </p>
    </div>
  );
};
